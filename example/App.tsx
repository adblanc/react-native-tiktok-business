import TiktokBusiness, {
  TikTokTrackingAuthorizationStatus,
} from "react-native-tiktok-business";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="Identify and Logout">
          <Button
            title="Identify"
            onPress={() => {
              TiktokBusiness.identify("test-external-id");
            }}
          />
          <Button
            title="Logout"
            onPress={() => {
              TiktokBusiness.logout();
            }}
          />
        </Group>
        <Group name="Debug Mode">
          <Text>{TiktokBusiness.isDebugMode() ? "True" : "False"}</Text>
        </Group>
        <Group name="Track Events">
          <Button
            title="Track Event"
            onPress={() => {
              TiktokBusiness.trackEvent("test-event");
            }}
          />
          <Button
            title="Track Event with Data"
            onPress={() => {
              TiktokBusiness.trackEvent(
                "test-event-with-data",
                "test-event-with-data-id",
                [
                  { key: "currency", value: "USD" },
                  // { key: "value", value: "100.5" },
                  { key: "quantity", value: "1" },
                  // { key: "price", value: "100.5" },
                ]
              );
            }}
          />
        </Group>
        <Group name="Request Tracking Authorization">
          <Button
            title="Request Tracking Authorization"
            onPress={async () => {
              const status =
                await TiktokBusiness.requestTrackingAuthorization();

              const showStatusMessage = () => {
                if (status) {
                  alert(TikTokTrackingAuthorizationStatus[status]);
                }
              };

              showStatusMessage();
            }}
          />
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  view: {
    flex: 1,
    height: 200,
  },
};
