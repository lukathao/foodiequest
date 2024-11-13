/* eslint-disable @typescript-eslint/no-unused-expressions */
import { parseHTML } from "@/server/parser/openai-parser";

const htmlString =
  `
<div class="foods">
    <div>
        <p>Beef Noodle Soup</p>
        <img src="https://example.com/image-beefnoodlesoup.jpg" alt="Beef Noodle Soup" />
    </div>
    <div>
        <p>Xiao Long Bao (Soup Dumplings)</p>
        <img src="https://example.com/image-xiaolongbao.jpg" alt="Xiao Long Bao" />
    </div>
    <div>
        <p>Oyster Omelette</p>
        <img src="https://example.com/image-oysteromelette.jpg" alt="Oyster Omelette" />
    </div>
    <div>
        <p>Bubble Tea</p>
        <img src="https://example.com/image-bubbletea.jpg" alt="Bubble Tea" />
    </div>
    <div>
        <p>Pineapple Cake</p>
        <img src="https://example.com/image-pineapplecake.jpg" alt="Pineapple Cake" />
    </div>
</div>

<div class="requirements">
    <ul>
        <li>Valid passport with at least 6 months remaining</li>
        <li>Visa-free entry for up to 90 days (for eligible countries)</li>
        <li>Proof of onward travel or return ticket</li>
        <li>Covid-19 vaccination certificate or recent test result (if applicable)</li>
        <li>Travel insurance covering Covid-19 (recommended)</li>
    </ul>
</div>

<div class="tour_guides">
    <div>
        <p class="contact_info">MyTaiwanTour - service@mytaiwantour.com - +886 2 2596 0393</p>
        <p class="site_info">Website: <a href="https://mytaiwantour.com">mytaiwantour.com</a></p>
    </div>
    <div>
        <p class="contact_info">Taiwan Adventure Outings - info@taiwan-adventures.com - +886 987 654321</p>
        <p class="site_info">Website: <a href="https://taiwan-adventures.com">taiwan-adventures.com</a></p>
    </div>
    <div>
        <p class="contact_info">Topology Travel - contact@topologytravel.com - +886 2 2365 3881</p>
        <p class="site_info">Website: <a href="https://topologytravel.com">topologytravel.com</a></p>
    </div>
</div>

<div class="activities">
    <ul>
        <li>Day 1: Visit to Taipei 101 and nearby shopping area</li>
        <li>Day 2: Historical tour of Chiang Kai-Shek Memorial Hall and National Palace Museum</li>
        <li>Day 3: Shilin Night Market food tour</li>
        <li>Day 4: Day trip to Jiufen and Shifen for cultural and scenic exploration</li>
    </ul>
</div>
`

describe('parseHTML', () => {
  it('parses prompt with activities correctly', () => {
    const { activities, guides, foods, requirements } = parseHTML(htmlString);
    expect(activities.length).toBe(4);
    expect(guides.length).toBe(3);
    expect(foods.length).toBe(5);
    expect(requirements.length).toBe(5);
  })
});

