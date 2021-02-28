import classNames from "classnames";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ItemList from "./ReactItemList";

import {
  loadItems as loadItemsActionCreator,
  selectLoadedItems,
} from "../../data/loadItems";

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
  componentDidUpdate(prevProps: Props) {
    if (!prevProps.loadedItems && this.props.loadedItems) {
      // TODO
    }
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
