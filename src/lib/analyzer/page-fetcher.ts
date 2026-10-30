import * as cheerio from "cheerio";
import type { CheerioAPI } from "cheerio";

export interface FetchedPage {
  html: string;
  $: CheerioAPI;
  statusCode: number;
  loadTime: number;
  url: string;
  finalUrl: string;
  headers: Record<string, string>;
}

export async function fetchPage(url: string): Promise<FetchedPage> {
  const startTime = Date.now();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      redirect: "follow",
    });

    const html = await response.text();
    const loadTime = Date.now() - startTime;
    const $ = cheerio.load(html);

    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return {
      html,
      $,
      statusCode: response.status,
      loadTime,
      url,
      finalUrl: response.url,
      headers,
    };
  } finally {
    clearTimeout(timeout);
  }
}
