import React from "react";
import styles from "./styles.css";

function Item({ text }) {
  return <p>{text}</p>;
}

export default function List() {
  return (
    <div className={styles.List}>
      <Item text="Foo" />
      <Item text="Bar" />
      <Item text="Baz" />
    </div>
  )
}