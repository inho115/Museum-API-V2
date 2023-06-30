import useSWR from "swr";
import Error from "next/error";
import Card from "react-bootstrap/Card";
import Link from "next/link";

export default async function ArtworkCard(props) {
  const { data, error, isLoading } = useSWR(
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
        <Card.Title>
          <p>{data.title ? data.title : "N/A"}</p>
        </Card.Title>
        <Card.Text>
          <p>{data.objectDate ? data.objectDate : "N/A"}</p>
          <p>{data.classification ? data.classification : "N/A"}</p>
          <p>{data.medium ? data.medium : "N/A"}</p>
          <br />
          <br />
          <p>{data.artistDisplayName ? data.artistDisplayName : "N/A"}</p>
          <p>
            {data.artistDisplayName ? (
              <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                wiki
              </a>
            ) : (
              ""
            )}
          </p>
          <p>{data.creditLine ? data.creditLine : "N/A"}</p>
          <p>{data.dimensions ? data.dimensions : "N/A"}</p>
          <Link passHref href={`/artwork/${props.objectID}`}>
            <Button>{props.objectID}</Button>
          </Link>
        </Card.Text>
      </Card>
    );
  } else {
    return null;
  }
}
