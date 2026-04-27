import { useEffect } from "react";

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function useMetaTags({
  title,
  description,
  image,
  url,
  type = "website",
}: MetaTagsProps) {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tag
    const updateMetaTag = (
      property: string,
      content: string,
      isName = false,
    ) => {
      const attribute = isName ? "name" : "property";
      let element = document.querySelector(
        `meta[${attribute}="${property}"]`,
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // Only use images that are absolute URLs (http/https)
    const isAbsoluteUrl = (str?: string) => {
      if (!str) return false;
      return (
        str.startsWith("http://") || str.startsWith("https://")
      );
    };

    // Open Graph tags
    if (title) {
      updateMetaTag("og:title", title);
    }
    if (description) {
      updateMetaTag("og:description", description);
      updateMetaTag("description", description, true);
    }
    if (image && isAbsoluteUrl(image)) {
      updateMetaTag("og:image", image);
      updateMetaTag("og:image:width", "1200");
      updateMetaTag("og:image:height", "630");
    }
    if (url) {
      updateMetaTag("og:url", url);
    }
    updateMetaTag("og:type", type);
    updateMetaTag("og:site_name", "Forge");

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image", true);
    if (title) {
      updateMetaTag("twitter:title", title, true);
    }
    if (description) {
      updateMetaTag("twitter:description", description, true);
    }
    if (image && isAbsoluteUrl(image)) {
      updateMetaTag("twitter:image", image, true);
      updateMetaTag(
        "twitter:image:alt",
        title || "Forge Game Token",
        true,
      );
    }

    // Cleanup function to reset to defaults
    return () => {
      document.title = "Forge - Game Token Launchpad";
    };
  }, [title, description, image, url, type]);
}