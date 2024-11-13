/* eslint-disable @typescript-eslint/no-unused-expressions */
import { parseHTML } from "@/server/parser/openai-parser";

const activitiesHtmlString =
  `
<div class="activities">
    <h2>Activities Schedule</h2>
    <ul>
        <li>Day 1 (Nov 14): Arrive - Explore Hanoi Old Quarter</li>
        <li>Day 2 (Nov 15): Dancing - Traditional Vietnamese Dance Show</li>
        <li>Day 3 (Nov 16): Hiking - Day trip to Ba Vi National Park</li>
        <li>Day 4 (Nov 17): Culture - Visit Ho Chi Minh Mausoleum and Museum</li>
        <li>Day 5 (Nov 18): Free Day - Explore local markets</li>
        <li>Day 6 (Nov 19): Dancing - Participate in a dance class</li>
        <li>Day 7 (Nov 20): Hiking - Trekking in Sapa (2-day tour)</li>
        <li>Day 8 (Nov 21): Culture - Cooking class</li>
        <li>Day 9 (Nov 22): Culture - Sightseeing around the lakes</li>
        <li>Day 10 (Nov 23): Free Day - Enjoy local street food</li>
        <li>Day 11 (Nov 24): Dancing - Visit a dance club</li>
        <li>Day 12 (Nov 25): Hiking - Day trip to Trang An</li>
        <li>Day 13 (Nov 26): Culture - Explore local art galleries</li>
        <li>Day 14 (Nov 27): Free Day - Last-minute shopping</li>
        <li>Day 15 (Nov 28): Prepare for departure</li>
        <li>Day 16 (Nov 29): Depart from Hanoi</li>
    </ul>
</div>
`;

const requirementsHtmlString =
  `
<div class="requirements">
    <h2>Requirements to Enter Vietnam</h2>
    <ul>
        <li>Passport with at least 6 months validity from the date of arrival.</li>
        <li>Visa (depending on your nationality): Visa on arrival, e-visa, or visa at the embassy.</li>
        <li>Proof of onward travel (flight itinerary).</li>
        <li>Proof of accommodation during your stay.</li>
    </ul>
</div>
`

const foodsHtmlString =
  `
<div class="foods">
    <h2>Foods to Try in Hanoi</h2>
    <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Cha_ca_hanoi.jpg" alt="Chả Cá Lã Vọng">
        <p>Chả Cá Lã Vọng</p>
    </div>
    <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Bun_Cha_Hanoi.jpg" alt="Bún Chả">
        <p>Bún Chả</p>
    </div>
    <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Phở_bò_gà.jpg" alt="Phở">
        <p>Phở</p>
    </div>
    <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/76/Banh_mi_1.jpg" alt="Bánh Mì">
        <p>Bánh Mì</p>
    </div>
    <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Xoi_xeo_hanoi.jpg" alt="Xôi">
        <p>Xôi</p>
    </div>
    <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/1/10/Cha_gio.jpg" alt="Chả Giò">
        <p>Chả Giò</p>
    </div>
    <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Coconut_Jelly_Vietnames_Vn.jpg" alt="Chè">
        <p>Chè</p>
    </div>
</div>
`

const tourGuidesHtmlString =
  `
<div class="tour_guides">
    <h2>Tour Guides</h2>
    <div>
        <p class="contact_info">Hanoi Local Tour Guide: +84 123 456 789</p>
        <p class="site_info">Source: www.hanoilocalguides.com</p>
    </div>
    <div>
        <p class="contact_info">Vietnam Discovery: +84 987 654 321</p>
        <p class="site_info">Source: www.vietnamdiscovery.com</p>
    </div>
    <div>
        <p class="contact_info">Hanoi Street Food Tours: +84 321 654 987</p>
        <p class="site_info">Source: www.hanoistreetfoodtours.com</p>
    </div>
</div>
`

describe('parseHTML', () => {
  it('parses activities correctly', () => {
    const { activities } = parseHTML(activitiesHtmlString);
    expect(activities.length).toBe(16);
  }),
    it('parses requirements correctly', () => {
      const { requirements } = parseHTML(requirementsHtmlString);
      expect(requirements.length).toBe(4);
    }),
    it('parses foods correctly', () => {
      const { foods } = parseHTML(foodsHtmlString);
      expect(foods.length).toBe(7);
    }),
    it('parses tour guides correctly', () => {
      const { guides } = parseHTML(tourGuidesHtmlString);
      expect(guides.length).toBe(3);
    })
});

