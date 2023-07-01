import useSWR from "swr";
import Error from "next/error";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function ArtworkCardDetail(props) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (data) {
    return (
      <Card>
        {data.primaryImage ? (
          <Card.Img variant="top" src={data.primaryImage} />
        ) : (
          ""
        )}
        <Card.Body>
          <Card.Title>
            <p>{data.title ? data.title : "N/A"}</p>
          </Card.Title>
          <Card.Text>
            <p>
              <strong>Date: </strong>
              {data.objectDate ? data.objectDate : "N/A"}
              <br />
              <strong>Classification: </strong>
              {data.classification ? data.classification : "N/A"}
              <br />
              <strong>Medium: </strong>
              {data.medium ? data.medium : "N/A"}
              <br />
              <br />
              <strong>Artist: </strong>
              {data.artistDisplayName ? data.artistDisplayName + " ( " : "N/A"}
              {data.artistDisplayName ? (
                <a
                  href={data.artistWikidata_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  wiki
                </a>
              ) : (
                ""
              )}
              {data.artistDisplayName ? " )" : ""}
              <br />
              <strong>Credit Line: </strong>
              {data.creditLine ? data.creditLine : "N/A"}
              <br />
              <strong>Dimensions: </strong>
              {data.dimensions ? data.dimensions : "N/A"}
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
}
