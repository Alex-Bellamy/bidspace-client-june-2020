import React from "react";
import { connect } from "react-redux";

const ListingContent = (props) => {
  let listingContent = <p id="content">{props.listing.content}</p>;

  return (
    <>
      <Item.Group divided>
        <Item data-cy={`listing-${listing.id}`} data-id={listing.id}>
        <Item.Image src={props.listing.image} />
          <Item.Content>
            <Item.Header data-cy="lead">{listing.lead}</Item.Header>
            <Item.Meta id="category">{listing.category}</Item.Meta>
            <Item.Description id="description">{listing.description}</Item.Description>
            <Item.Extra>
              <Label data-cy="scene">{listing.scene}</Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </>
  );
};

export default connect(mapStateToProps)(ListingContent);