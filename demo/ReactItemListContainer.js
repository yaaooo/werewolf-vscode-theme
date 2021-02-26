import classNames from "classnames";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ItemList from "./ReactItemList";

import {
  loadItems as loadItemsActionCreator,
  selectLoadedItems,
} from "../../data/network";


import styles from "./styles.css";

type OwnProps = {|
  className?: string,
|};

type ConnectedStateProps = {|
  loadedItems?: string[],
|};

type ConnectedDispatchProps = {|
  loadItems: typeof loadItemsActionCreator,
|};

type Props = {|
  ...OwnProps,
  ...ConnectedStateProps,
  ...ConnectedDispatchProps,
|};

export class ItemListContainer extends PureComponent<Props> {
  componentDidMount() {
    // This is a comment.
    // This is another comment.
    window.addEventListener("resize", this.onResize);
  }

  onResize = () => {
    console.log("Window was resized.");
    this.props.loadItems();
  }

  render() {
    const { loadedItems, className = "" } = this.props;
      const displayText = loadedItems && loadedItems.length > 0
        ? "Items loaded"
        : "No items to load";

      return (
        <div className={className}>
          <h2>{displayText}</h2>
          <ItemList items={loadedItems} />
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    loadedItems: selectLoadedItems(state),
  };
}

function mapDispatchToProps(dispatch) {
  const boundActionCreators = bindActionCreators(
    {
      loadItems: loadItemsActionCreator,
    },
    dispatch,
  );
  return boundActionCreators;
}

export default connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(ItemList);
