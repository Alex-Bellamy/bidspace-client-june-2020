import React, { useState } from "react";
import axios from "axios";
import { Form, TextArea, Input, Label, Button } from "semantic-ui-react";

const CreateListing = () => {
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedScene, setSelectedScene] = useState("");

  const categoryOption = [{ key: "p", text: "Parking", value: "parking" }];

  const sceneOptions = [
    { key: "i", text: "Indoors", value: "indoor" },
    { key: "o", text: "Outdoors", value: "outdoor" },
  ];

  const submitListing = async (event) => {
    debugger;
    event.preventDefault();
    let responseMessage, listingParams, response;
    let { lead, description, address, price } = event.target;
    const headers = JSON.parse(localStorage.getItem("J-tockAuth-storage"));

    try {
      listingParams = {
        category: selectedCategory,
        scene: selectedScene,
        lead: lead.value,
        description: description.value,
        address: address.value,
        price: price.value,
      };
      response = await axios.post(
        "http://localhost:3000/api/v1/listings",
        { listing: listingParams },
        { headers: headers }
      );

      responseMessage = response.data.message;
    } catch (error) {
      responseMessage = response.data.error;
    } finally {
      setMessage(responseMessage);
    }
  };
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleSceneChange = (value) => {
    setSelectedScene(value);
  };

  return (
    <>
      <h2 data-cy="title">Rent my space</h2>
      <Form data-cy="listing-form" onSubmit={submitListing}>
        <Form.Group>
          <Form.Select
            onChange={(event, data) => {
              handleCategoryChange(data.value);
            }}
            options={categoryOption}
            placeholder="Parking"
            id="parking"
            name="parking"
            label="Category"
          />
          <Form.Select
            onChange={(event, data) => {
              handleSceneChange(data.value);
            }}
            options={sceneOptions}
            placeholder="Indoors or Outdoors"
            id="scene"
            name="scene"
            label="Scene"
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            control={Input}
            data-cy="lead"
            placeholder="Lead"
            id="lead"
            name="lead"
            label="Lead"
          />
          <Form.Field
            control={TextArea}
            data-cy="description"
            placeholder="Description"
            name="description"
            label="Description"
            id="description"
          />
          <Form.Field
            control={Input}
            data-cy="address"
            placeholder="Address"
            name="address"
            label="Address"
          />
        </Form.Group>
        <Form.Group>
        <Form.Field
            control={Input}
            data-cy="price"
            placeholder="Price"
            name="price"
            label="Price"
          />
        </Form.Group>
        <Form.Group>
          <Button data-cy="button" type="submit">
            Submit Listing
          </Button>
        </Form.Group>
      </Form>
      {message && <p data-cy="message">{message}</p>}
      <br />
    </>
  );
};
export default CreateListing;
