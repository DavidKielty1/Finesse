import { gql, useLazyQuery } from "@apollo/client";
import { FC, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryLabel,
} from "../modules/charts";
import { DateTime } from "luxon";

const styles = StyleSheet.create({
  searchOuter: {
    backgroundColor: "#555",
  },
  searchInner: {
    flexDirection: "row",
    margin: 15,
  },
  input: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    flex: 1,
    padding: 8,
  },
  button: {
    alignItems: "center",
    backgroundColor: "orange",
    borderRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: "center",
    height: 44,
    width: 44,
  },
  buttonText: {
    color: "#000",
    fontWeight: "500",
  },
});

const Overview: FC = () => {
  const [symbol, setSymbol] = useState("");

  const [execQuery, { data, loading, error }] = useLazyQuery(gql`
    query Lookup($symbol: String!) {
      lookup(symbol: $symbol) {
        symbol
        revenue(resolution: quarterly) {
          date
          value
        }
      }
    }
  `);

  if (error) return <Text>{error.message}</Text>;

  const chartData = data ? [...data.lookup.revenue].reverse() : [];

  return (
    <ScrollView>
      <View style={styles.searchOuter}>
        <SafeAreaView style={styles.searchInner}>
          <TextInput
            style={styles.input}
            value={symbol}
            onChangeText={setSymbol}
          />
          <Pressable
            accessibilityLabel="Go"
            accessibilityRole="button"
            style={styles.button}
            onPress={() => execQuery({ variables: { symbol } })}
          >
            <Text style={styles.buttonText}>Go</Text>
          </Pressable>
        </SafeAreaView>
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            <VictoryAxis
              tickFormat={(date: string) =>
                DateTime.fromISO(date).toLocaleString({
                  month: "short",
                  year: "numeric",
                })
              }
              tickLabelComponent={
                <VictoryLabel
                  angle={-45}
                  style={{ fontSize: 8 }}
                  textAnchor="end"
                />
              }
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => `$${x / 1000000000}b`}
            />
            <VictoryBar data={chartData} x="date" y="value" />
          </VictoryChart>
        </View>
      )}
    </ScrollView>
  );
};

export default Overview;
