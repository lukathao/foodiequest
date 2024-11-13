/* eslint-disable @typescript-eslint/no-unused-expressions */
import { parseHTML } from "@/server/parser/openai-parser";

const htmlString =
  `
<div class="foods">
    <div>
        <p>Pad Thai</p>
        <img src="https://example.com/image-padthai.jpg" alt="Pad Thai" />
    </div>
    <div>
        <p>Som Tum (Green Papaya Salad)</p>
        <img src="https://example.com/image-somtum.jpg" alt="Som Tum" />
    </div>
    <div>
        <p>Khao Pad (Thai Fried Rice)</p>
        <img src="https://example.com/image-khaopad.jpg" alt="Khao Pad" />
    </div>
    <div>
        <p>Tom Yum Goong (Spicy Shrimp Soup)</p>
        <img src="https://example.com/image-tomyum.jpg" alt="Tom Yum Goong" />
    </div>
    <div>
        <p>Mango Sticky Rice</p>
        <img src="https://example.com/image-mangostickyrice.jpg" alt="Mango Sticky Rice" />
    </div>
</div>

<div class="requirements">
    <ul>
        <li>Valid passport with at least 6 months remaining</li>
        <li>Visa exemption for up to 30 days (for eligible countries) or Tourist Visa</li>
        <li>Proof of onward travel or return ticket</li>
        <li>Proof of sufficient funds for your stay</li>
        <li>Covid-19 vaccination certificate or recent test result (if applicable)</li>
        <li>Travel insurance covering Covid-19 (recommended)</li>
    </ul>
</div>

<div class="tour_guides">
    <div>
        <p class="contact_info">Expique - tours@expique.com - +66 2 1234567</p>
        <p class="site_info">Website: <a href="https://expique.com">expique.com</a></p>
    </div>
    <div>
        <p class="contact_info">Bangkok Vanguards - contact@bangkokvanguards.com - +66 2 9876543</p>
        <p class="site_info">Website: <a href="https://bangkokvanguards.com">bangkokvanguards.com</a></p>
    </div>
    <div>
        <p class="contact_info">TakeMeTour - info@takemetour.com - +66 2 3456789</p>
        <p class="site_info">Website: <a href="https://takemetour.com">takemetour.com</a></p>
    </div>
</div>

<div class="activities">
    <ul>
        <li>Day 1: Guided biking tour around Bangkok</li>
        <li>Day 2: Historical tour of the Grand Palace and Wat Arun</li>
        <li>Day 3: Thai dancing class at a local cultural center</li>
        <li>Day 5: Biking through Bang Krachao (Bangkok's Green Lung)</li>
        <li>Day 6: Visiting the Bangkok National Museum for a history tour</li>
        <li>Day 7: Nightlife dancing experience in Sukhumvit area</li>
        <li>Day 8: Biking tour of Ayutthaya Historical Park (day trip from Bangkok)</li>
        <li>Day 9: History-focused walking tour of Chinatown</li>
    </ul>
</div>
`

describe('parseHTML', () => {
  it('parses prompt with activities correctly', () => {
    const { activities, guides, foods, requirements } = parseHTML(htmlString);
    expect(activities.length).toBe(8);
    expect(guides.length).toBe(3);
    expect(foods.length).toBe(5);
    expect(requirements.length).toBe(6);
  })
});

