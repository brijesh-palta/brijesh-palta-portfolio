"use client";

/**
 * SecurityScript
 * --------------
 * Informational security notice.
 * No fake blocking of DevTools or screenshots.
 */

export function SecurityScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          console.info(
            "Security Notice: This is a static portfolio site following frontend security best practices."
          );
        `,
      }}
    />
  );
}
