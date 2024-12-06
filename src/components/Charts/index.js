import React from "react";
import { Line, Pie } from "@ant-design/charts";
import { Card, Row } from "antd";
const ChartComponents = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = sortedTransactions
    .filter((transaction) => {
      return transaction.type === "expense";
    })
    .map((transaction) => {
      return { tag: transaction.tag, amount: transaction.amount };
    });

  // let finalSpendings = spendingData.reduce((acc, obj) => {
  //   let key = obj.tag;
  //   if (!acc[key]) {
  //     acc[key] = { tag: obj.tag, amount: obj.amount };
  //   } else {
  //     acc[key].amount += obj.amount;
  //   }
  //   return acc;
  // }, {});

  let newSpending = [
    { tag: "food", amount: 0 },
    { tag: "education", amount: 0 },
    { tag: "office", amount: 0 },
  ];
  spendingData.forEach((item) => {
    if (item.tag === "food") {
      newSpending[0].amount += item.amount;
    } else if (item.tag === "education") {
      newSpending[1].amount += item.amount;
    } else {
      newSpending[2].amount += item.amount;
    }
  });
  const config = {
    data: data,
    autoFit: true,
    xField: "date",
    yField: "amount",
  };
  const spendingConfig = {
    data: spendingData,
    angleField: "amount",
    colorField: "tag",
  };

  const cardStyle = {
    boxShadow: "0px 0px 30px 8px rgba(227, 227, 227, 0.75)",
    margin: "2rem",
    borderRadius: "0.5rem",
    minWidth: "400px",
    flex: 1,
  };

  let chart;
  let pieChart;
  return (
    <>
      <Row gutter={16}>
        <Card bordered={true} style={cardStyle}>
          <h2>Your Analytics</h2>
          <Line
            {...config}
            onReady={(chartInstance) => (chart = chartInstance)}
          />
        </Card>
        <Card bordered={true} style={{ ...cardStyle, flex: 0.45 }}>
          <h2>Your Spendings</h2>
          <Pie
            {...spendingConfig}
            onReady={(chartInstance) => (pieChart = chartInstance)}
          />
        </Card>
      </Row>
    </>
  );
};

export default ChartComponents;
