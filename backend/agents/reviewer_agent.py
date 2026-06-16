from config.llm import llm
import re


INDIAN_CRIMINAL_LAW_KEYWORDS = {
    "bns", "bharatiya nyaya sanhita", "ipc", "indian penal code",
    "criminal", "offence", "offense", "punishment", "crime",
    "section", "article", "investigation", "prosecution", "arrest",
    "procedure", "evidence", "bail", "conviction", "sentence",
    "culpable", "mens rea", "actus reus", "sentencing", "appeal",
    "acquittal", "cognizable", "non-cognizable", "fir", "chargesheet",
    "affidavit", "witness", "examination", "cross-examination",
    "penal", "legal", "law", "court", "judge", "magistrate",
    "lawyer", "counsel", "jurisdiction", "competence", "damages",
    "robbery", "robbed", "theft", "stolen", "theft", "burglary",
    "assault", "attack", "violence", "hit", "beat", "injure",
    "murder", "kill", "death", "manslaughter", "homicide",
    "rape", "sexual", "molestation", "harassment", "abuse",
    "fraud", "cheating", "scam", "forgery", "fake",
    "kidnapping", "abduction", "hostage", "ransom",
    "defamation", "slander", "libel", "insult", "obscene",
    "drugs", "narcotic", "substance", "illegal", "contraband",
    "weapon", "gun", "knife", "firearm", "explosive",
    "arson", "fire", "burn", "property damage",
    "trespassing", "intrusion", "unlawful entry",
    "false statement", "perjury", "lie under oath",
    "complaint", "fir", "report", "accused", "victim",
    "guilty", "innocent", "liable", "case", "trial"
}


def is_criminal_law_domain(text: str) -> bool:
    if not text:
        return False
    text_lower = text.lower()
    keyword_count = sum(1 for keyword in INDIAN_CRIMINAL_LAW_KEYWORDS if keyword in text_lower)
    return keyword_count >= 1


def validate_score_consistency(query: str, answer: str, score: float, reason: str) -> tuple[float, str]:
    if not is_criminal_law_domain(query):
        return 0.0, "Question is outside Indian criminal law scope."

    if not answer or len(answer.strip()) < 20:
        return max(0.0, min(score, 2.0)), "Answer is too short or empty."

    if not is_criminal_law_domain(answer):
        return 0.0, "Response does not address criminal law."

    if score >= 10.0:
        query_len = len(query.strip())
        answer_len = len(answer.strip())
        if answer_len < 200 or "minor" in reason.lower() or "incomplete" in reason.lower():
            return 9.0, "Answer may not be exceptional enough for perfect 10."

    score = max(0.0, min(score, 10.0))
    return score, reason


def review(
    query: str,
    answer: str,
    chat_history: str = ""
):

    prompt = f"""
You are a STRICT Legal Answer Reviewer for an Indian Criminal Law AI system.

DOMAIN BOUNDARY CHECK - HIGHEST PRIORITY:
Only the following are IN SCOPE:
- Bharatiya Nyaya Sanhita (BNS) & Indian Penal Code (IPC)
- Criminal law, offences, punishments
- Investigation & prosecution procedures
- Criminal evidence & procedure
- Criminal courts & legal process

OUT OF SCOPE (SCORE 0):
- Geography, history, sports, general knowledge
- Civil law, property, contracts
- Non-legal topics
- Questions answered incorrectly

Examples of domain rejection:
Q: "Where is Jaipur?" → Score 0 (geography, not criminal law)
Q: "Who is Virat Kohli?" → Score 0 (sports, not criminal law)
Q: "What is machine learning?" → Score 0 (technology, not criminal law)

Previous Conversation:
{chat_history}

Question:
{query}

Answer:
{answer}

REVIEW CHECKLIST:

1. DOMAIN RELEVANCE (Mandatory - Score 0 if failed)
   ✓ Is the question about Indian criminal law/BNS/IPC?
   ✓ Does the answer address criminal law?
   ✓ If NO → Score MUST be 0

2. FACTUAL ACCURACY
   ✓ Is legal information correct?
   ✓ Are BNS/IPC sections accurately cited?
   ✓ Any hallucinated sections or false claims?

3. COMPLETENESS
   ✓ Does answer fully address the question?
   ✓ Are critical details missing?
   ✓ Is it substantive (not just 1-2 sentences)?

4. RELEVANCE & COHERENCE
   ✓ Does answer directly relate to question?
   ✓ No irrelevant tangents?

5. HALLUCINATION DETECTION
   ✗ Fabricated sections? Deduct 5+ points
   ✗ Incorrect legal claims? Deduct 3+ points
   ✗ Unsupported statements? Deduct 2+ points

STRICT SCORING RULES:

10 = EXCEPTIONAL - Comprehensive, accurate, complete answer with proper legal citations (RARE)
8-9 = STRONG - Accurate answer with minor omissions
6-7 = ADEQUATE - Addresses question but missing some details
3-5 = POOR - Significant errors or missing information
1-2 = VERY POOR - Mostly wrong, minimal useful information
0 = DOMAIN FAIL - Question outside criminal law OR answer completely irrelevant

CRITICAL RULES (NON-NEGOTIABLE):
- If question is NOT about Indian criminal law → SCORE MUST BE 0
- If answer does NOT address the question → SCORE MUST BE BELOW 3
- If answer is too short/vague → SCORE MUST BE BELOW 7
- If answer lacks legal specifics → SCORE MUST BE BELOW 8
- A score of 10 should happen rarely (1 in 20 reviews)

RESPOND IN THIS FORMAT ONLY:

SCORE: <0-10 number>
REASON: <one sentence explaining score>
"""

    result = llm.invoke(prompt)
    response_text = result.content

    score_match = re.search(r"SCORE:\s*([0-9.]+)", response_text)
    reason_match = re.search(r"REASON:\s*(.+?)(?:\n|$)", response_text)

    score = float(score_match.group(1)) if score_match else 0.0
    reason = reason_match.group(1).strip() if reason_match else "Unknown reason"

    validated_score, validation_reason = validate_score_consistency(query, answer, score, reason)

    if validated_score != score:
        reason = validation_reason
        score = validated_score

    final_response = f"SCORE: {score}\nREASON: {reason}"

    return final_response