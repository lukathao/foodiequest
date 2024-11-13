/* eslint-disable @typescript-eslint/no-unused-expressions */
import { parseHTML } from "@/server/parser/openai-parser";

const htmlString =
  `
<div class="foods">
    <div>
        <p>Larb (Minced Meat Salad)</p>
        <img src="https://example.com/image-larb.jpg" alt="Larb" />
    </div>
    <div>
        <p>Laap Moo (Pork Salad)</p>
        <img src="https://example.com/image-laapmoo.jpg" alt="Laap Moo" />
    </div>
    <div>
        <p>Sticky Rice</p>
        <img src="https://example.com/image-stickyrice.jpg" alt="Sticky Rice" />
    </div>
    <div>
        <p>Khao Piak Sen (Lao Noodle Soup)</p>
        <img src="https://example.com/image-khaopiaksen.jpg" alt="Khao Piak Sen" />
    </div>
    <div>
        <p>Tom Mak Hoong (Papaya Salad)</p>
        <img src="https://example.com/image-tommakhoong.jpg" alt="Tom Mak Hoong" />
    </div>
</div>

<div class="requirements">
    <ul>
        <li>Valid passport with at least 6 months remaining</li>
        <li>Visa on Arrival or E-visa (for eligible countries)</li>
        <li>Proof of onward travel or return ticket</li>
        <li>Proof of sufficient funds for your stay</li>
        <li>Covid-19 vaccination certificate or recent test result (if applicable)</li>
        <li>Travel insurance covering Covid-19 (recommended)</li>
    </ul>
</div>

<div class="tour_guides">
    <div>
        <p class="contact_info">Vientiane ByCycle - info@vientianebycycle.com - +856 21 123456</p>
        <p class="site_info">Website: <a href="https://vientianebycycle.com">vientianebycycle.com</a></p>
    </div>
    <div>
        <p class="contact_info">Lao Scenic Tours - bookings@laoscenictours.com - +856 21 654321</p>
        <p class="site_info">Website: <a href="https://laoscenictours.com">laoscenictours.com</a></p>
    </div>
    <div>
        <p class="contact_info">Asia Safari Laos - tours@asiasafarilaos.com - +856 20 9876543</p>
        <p class="site_info">Website: <a href="https://asiasafarilaos.com">asiasafarilaos.com</a></p>
    </div>
</div>

<div class="activities">
    <ul>
        <li>Day 1: Visit to Patuxai (Victory Gate) for architectural insights</li>
        <li>Day 2: Explore Wat Si Saket and Haw Phra Kaew temples</li>
        <li>Day 3: Cultural dance performance at the National Cultural Hall</li>
        <li>Day 4: Day trip to Buddha Park for unique sculptures</li>
        <li>Day 5: Mekong Riverside biking tour and nature exploration</li>
        <li>Day 6: Lao traditional music and dance workshop</li>
        <li>Day 7: Day hike through Phou Khao Khouay National Park</li>
        <li>Day 8: Explore That Luang Stupa and nearby historic sites</li>
        <li>Day 9: Evening traditional dance event in downtown Vientiane</li>
        <li>Day 10: River cruise on the Mekong for nature views</li>
    </ul>
</div>

`

describe('parseHTML', () => {
  it('parses prompt with activities correctly', () => {
    const { activities, guides, foods, requirements } = parseHTML(htmlString);
    expect(activities.length).toBe(10);
    expect(guides.length).toBe(3);
    expect(foods.length).toBe(5);
    expect(requirements.length).toBe(6);
  })
});

