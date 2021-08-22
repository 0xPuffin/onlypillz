import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://blackhole.bet" target="_blank" rel="noopener noreferrer">
      <PageHeader
        avatar={{
          src:"/logo512.png"
        }}
        title="Blackhole"
        subTitle="bet your heart out"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
