import React from "react";
import { Button, View } from "native-base";

export default function SchedulingFilter({ setFilters, filters }) {
  const handleChangeFilters = (type) => {
    if (type === "mine") {
      setFilters({
        mine: !filters.mine,
        all: false,
        opens: false,
        closed: false,
        subject: filters.subject,
      });
    } else if (type === "all") {
      setFilters({
        mine: false,
        all: !filters.all,
        opens: false,
        closed: false,
        subject: filters.subject,
      });
    } else if (type === "opens") {
      setFilters({
        mine: false,
        all: false,
        opens: !filters.opens,
        closed: false,
        subject: filters.subject,
      });
    } else if (type === "closed") {
      setFilters({
        mine: false,
        all: false,
        opens: false,
        closed: !filters.closed,
        subject: filters.subject,
      });
    }
  };

  return (
    <View width="100%" justifyContent="space-around" marginBottom={4}>
      <View flexDirection="row" justifyContent="space-evenly">
        <Button
          width="30%"
          borderRadius="full"
          borderColor="#024284"
          _text={{
            color: filters.all ? "#fff" : "#024284",
          }}
          variant={filters.all ? "solid" : "outline"}
          onPress={() => handleChangeFilters("all")}
        >
          Todos
        </Button>
        <Button
          width="30%"
          borderRadius="full"
          borderColor="#024284"
          _text={{
            color: filters.opens ? "#fff" : "#024284",
          }}
          variant={filters.opens ? "solid" : "outline"}
          onPress={() => handleChangeFilters("opens")}
        >
          Confirmados
        </Button>
        <Button
          width="30%"
          borderRadius="full"
          borderColor="#024284"
          _text={{
            color: filters.closed ? "#fff" : "#024284",
          }}
          variant={filters.closed ? "solid" : "outline"}
          onPress={() => handleChangeFilters("closed")}
        >
          Encerrados
        </Button>
      </View>
    </View>
  );
}
