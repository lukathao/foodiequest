/* eslint-disable @typescript-eslint/no-unused-expressions */
import { parseHTML } from "@/server/parser/openai-parser";

const htmlString =
  `
<div class="foods">
    <div>
        <p>Pho (Vietnamese Noodle Soup)</p>
        <img src="https://example.com/image-pho.jpg" alt="Pho" />
    </div>
    <div>
        <p>Banh Mi (Vietnamese Sandwich)</p>
        <img src="https://example.com/image-banhmi.jpg" alt="Banh Mi" />
    </div>
    <div>
        <p>Bun Cha (Grilled Pork with Vermicelli)</p>
        <img src="https://example.com/image-buncha.jpg" alt="Bun Cha" />
    </div>
    <div>
        <p>Cha Ca (Grilled Fish with Dill and Turmeric)</p>
        <img src="https://example.com/image-chaca.jpg" alt="Cha Ca" />
    </div>
    <div>
        <p>Egg Coffee</p>
        <img src="https://example.com/image-eggcoffee.jpg" alt="Egg Coffee" />
    </div>
</div>

<div class="requirements">
    <ul>
        <li>Valid passport with at least 6 months remaining</li>
        <li>Visa (E-visa or Visa on Arrival for eligible countries)</li>
        <li>Proof of onward travel or return ticket</li>
        <li>Proof of sufficient funds for your stay</li>
        <li>Covid-19 vaccination certificate or recent test result (if applicable)</li>
        <li>Travel insurance covering Covid-19 (recommended)</li>
    </ul>
</div>

<div class="tour_guides">
    <div>
        <p class="contact_info">Ha Noi Free Walking Tours - contact@hanoifreewalkingtours.com - +84 123456789</p>
        <p class="site_info">Website: <a href="https://hanoifreewalkingtours.com">hanoifreewalkingtours.com</a></p>
    </div>
    <div>
        <p class="contact_info">Hanoi Kids Tour - booking@hanoikids.org - +84 987654321</p>
        <p class="site_info">Website: <a href="https://hanoikids.org">hanoikids.org</a></p>
    </div>
    <div>
        <p class="contact_info">Custom Vietnam Travel - info@customvietnamtravel.com - +84 912345678</p>
        <p class="site_info">Website: <a href="https://customvietnamtravel.com">customvietnamtravel.com</a></p>
    </div>
</div>
`

describe('parseHTML', () => {
  it('parses minimum input prompt correctly', () => {
    const { activities, guides, foods, requirements } = parseHTML(htmlString);
    expect(activities.length).toBe(0);
    expect(guides.length).toBe(3);
    expect(foods.length).toBe(5);
    expect(requirements.length).toBe(6);
  })
});

