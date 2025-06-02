export function getCookieValue(cookieName: string): string {
  try {
    if (typeof document === "undefined") {
      console.log("🧪 Simulating cookie in restricted environment");
      return "simulated_oh_click_cookie_value";
    }
    
    // Read and decode cookies
    const cookiePrefix = `${cookieName}=`;
    const decodedCookies = decodeURIComponent(document.cookie || "");
    const cookieArray = decodedCookies.split(";");

    // Find the cookie value for the specified name
    for (const rawCookie of cookieArray) {
      const trimmedCookie = rawCookie.trim();
      if (trimmedCookie.startsWith(cookiePrefix)) {
        return trimmedCookie.substring(cookiePrefix.length);
      }
    }

    return "";
  } catch (error) {
    console.error("❌ Error reading cookie:", error);
    return "";
  }
}