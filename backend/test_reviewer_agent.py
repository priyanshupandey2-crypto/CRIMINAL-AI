from agents.reviewer_agent import review

print(
    review(
        "What is the punishment for theft?",
        """The punishment for theft varies depending on the nature of the theft, the circumstances, and whether it is a first or subsequent conviction. General theft can lead to imprisonment, fine, or both, with specific provisions for first-time offenders involving community service if the property value is low and restored. Aggravated forms of theft, such as snatching, theft in specific locations (dwelling, transport, worship place), theft by a clerk/servant, or theft involving preparation for violence, carry higher penalties. An attempt to commit theft involving assault or criminal force also has a distinct punishment.

Relevant BNS Provisions:
  Section 303(2): General punishment for theft.
  Section 304(2): Punishment for snatching.
  Section 305: Punishment for theft in a dwelling house, means of transportation, place of worship, or government/local authority property.
  Section 306: Punishment for theft by a clerk or servant.
  Section 307: Punishment for theft after preparation made for causing death, hurt, or restraint.
  Section 134: Punishment for assault or criminal force in an attempt to commit theft of property carried by a person.

Punishment:

1.  **General Theft (Section 303(2)):**
    *   **First conviction:** Imprisonment of either description for a term which may extend to three years, or with fine, or with both.
    *   **First conviction (specific condition):** If the value of the stolen property is less than five thousand rupees, and the person is convicted for the first time, upon return of the value of property or restoration of the stolen property, the person shall be punished with community service.
    *   **Second or subsequent conviction:** Rigorous imprisonment for a term which shall not be less than one year but which may extend to five years, and with fine.

2.  **Snatching (Section 304(2)):**
    *   Imprisonment of either description for a term which may extend to three years, and shall also be liable to fine.

3.  **Theft in a dwelling house, means of transportation, place of worship, or government/local authority property (Section 305):**
    *   Imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.

4.  **Theft by clerk or servant of property in possession of master (Section 306):**
    *   Imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.

5.  **Theft after preparation made for causing death, hurt or restraint (Section 307):**
    *   Rigorous imprisonment for a term which may extend to ten years, and shall also be liable to fine.

6.  **Assault or criminal force in attempt to commit theft of property carried by a person (Section 134):**
    *   Imprisonment of either description for a term which may extend to two years, or with fine, or with both.

Notes:
The BNS provisions distinguish between various forms of theft, imposing more severe penalties for thefts committed in specific locations, by persons in positions of trust, or where there is an element of violence or preparation for violence. The general theft provision also includes a specific leniency for first-time offenders involving low-value property and restoration, allowing for community service instead of imprisonment or fine."""
    )
)