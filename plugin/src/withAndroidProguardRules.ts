import { ConfigPlugin } from "expo/config-plugins";
import { withDangerousMod } from "expo/config-plugins";
import path from "path";
import fs from "fs";
import { appendContents, purgeContents } from "./utils";

/**
 * Appends `props.android.extraProguardRules` content into `android/app/proguard-rules.pro`
 * Source: https://github.com/expo/expo/blob/main/packages/expo-build-properties/src/android.ts
 */
export const withAndroidProguardRules: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const extraProguardRules = `
      -keep class com.tiktok.** { *; }
      -keep class com.android.billingclient.api.** { *; }
      `;
      const proguardRulesFile = path.join(
        config.modRequest.platformProjectRoot,
        "app",
        "proguard-rules.pro"
      );

      const contents = await fs.promises.readFile(proguardRulesFile, "utf8");
      const newContents = updateAndroidProguardRules(
        contents,
        extraProguardRules,
        "append"
      );
      if (contents !== newContents) {
        await fs.promises.writeFile(proguardRulesFile, newContents);
      }
      return config;
    },
  ]);
};

/**
 * Update `newProguardRules` to original `proguard-rules.pro` contents if needed
 *
 * @param contents the original `proguard-rules.pro` contents
 * @param newProguardRules new proguard rules to add. If the value is null, the returned value will be original `contents`.
 * @returns return updated contents
 */
function updateAndroidProguardRules(
  contents: string,
  newProguardRules: string | null,
  updateMode: "append" | "overwrite"
): string {
  if (newProguardRules == null) {
    return contents;
  }

  const options = { tag: "expo-build-properties", commentPrefix: "#" };
  let newContents = contents;
  if (updateMode === "overwrite") {
    newContents = purgeContents(contents, options);
  }
  if (newProguardRules !== "") {
    newContents = appendContents(newContents, newProguardRules, options);
  }
  return newContents;
}
