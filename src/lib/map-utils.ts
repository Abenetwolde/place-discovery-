export function getStaticMapUrl(options: any) {
    const apiKey = "sam_sam_FSUP9N1D50qTgg1mMUODH61sRHKhE8jg";
    const baseUrl = "https://api.ambalaymaps.com/v1/staticmap";
  
    const defaultOptions = {
      center: "9.03,38.74", // Addis Ababa coordinates
      zoom: 12,
      size: "600x400",
      maptype: "roadmap",
    };
  
    const mergedOptions = { ...defaultOptions, ...options, key: apiKey };
  
    const queryParams = Object.entries(mergedOptions)
      .map(([key, value]: any) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
  
    return `${baseUrl}?${queryParams}`;
  }
  
  export interface Service {
    title: string;
    description: string;
    image: string;
    currentDateTime?: string;
    distance?: string;
    rating?: number;
    tags?: string[];
  }