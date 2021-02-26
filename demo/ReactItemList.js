import React from "react";
import styles from "./styles.css";

function Item({ text }) {
  return <p>{text}</p>;
}

export default function ItemList({ items }) {
  // This is a comment
  // This is another comment
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <Item key={item} text={item} />
      ))}
    </div>
  );
}
