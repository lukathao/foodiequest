import { Activity, Food, Requirement, TourGuide } from "@/interfaces/travel";
import { load } from "cheerio";


export const parseHTML = (htmlString: string) => {
  const $ = load(htmlString);
  let requirements: Requirement[] = [];
  let foods: Food[] = [];
  let guides: TourGuide[] = [];
  let activities: Activity[] = [];

  try {
    $('.requirements ul li').each((_, element) => {
      const str = $(element).text().trim();
      requirements.push({ description: str });
    });

    $('.foods > div').each((index, element) => {
      const name = $(element).find('p').text();
      const url = $(element).find('img').attr('src');
      foods.push({ name, url });
    });

    $('.tour_guides > div').each((_, element) => {
      const contactInfo = $(element).find('.contact_info').text();
      const siteInfo = $(element).find('.site_info').text();

      // Split to extract name and phone from contact info
      const [name, contact] = contactInfo.split(':').map(text => text.trim());
      const website = siteInfo.replace('Source: ', '').trim();
      guides.push({ name, contact, website });
    });

    $('.activities ul li').each((i, element) => {
      const text = $(element).text().trim();
      activities.push({
        order: i,
        description: text,
      });
    });

    return {
      requirements,
      foods,
      guides,
      activities,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Unable to finsh parsing content");
  }
}
