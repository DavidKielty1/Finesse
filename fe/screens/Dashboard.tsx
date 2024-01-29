// import React, { useState } from "react";
// import { useMutation, gql } from "@apollo/client";
// import { View, TextInput, Button } from "react-native";

// const Dashboard: React.FC = () => {
//   const [symbol, setSymbol] = useState("");

//   const [getQuote, { data, loading, error }] = useMutation(gql`
//     mutation ($symbol: String!) {
//       quote(symbol: $symbol) {
//         change
//         changePercent
//         companyName
//         delayedPrice
//         peRatio
//         previousClose
//         symbol
//       }
//     }
//   `);

//   //   if (loading) return <div>Loading...</div>;
//   //   if (error) return <div>{`Error: ${error}`}</div>;

//   return (
//     <View>
//       <TextInput value={symbol} onChangeText={setSymbol} />
//       <Button
//         onPress={() => getQuote({ variables: { symbol } })}
//         title="Get Quote"
//       />
//       <div>{JSON.stringify(error || data)}</div>
//     </View>
//   );
// };

// export default Dashboard;
