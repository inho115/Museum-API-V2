const PER_PAGE = 12;
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Error from "next/error";
import { Row, Card, Pagination } from "react-bootstrap";

export default function ArtWork() {
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);
  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];
  const { data, error, isLoading } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    if (data != null || data != undefined) {
      results = [];
      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  });

  if (error) {
    return <Error statusCode={404} />;
  }

  if (artworkList != null || artworkList != undefined) {
    return (
      <>
        <Row className="gy-4">
          {artworkList.length > 0
            ? [page - 1].map((artwork) => {
                return (
                  <Col lg={3} key={artwork.objectID}>
                    <ArtworkCard objectID={artwork.objectID} />
                  </Col>
                );
              })
            : ""}
          {artworkList.length == 0 ? (
            <Card>
              <Card.Text>
                <h4>Nothing Here</h4>
              </Card.Text>
            </Card>
          ) : (
            ""
          )}
        </Row>
        {artworkList.length > 0 ? (
          <Row>
            <Pagination>
              <Pagination.Prev onClick={previousPage}></Pagination.Prev>
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage}></Pagination.Next>
            </Pagination>
          </Row>
        ) : (
          ""
        )}
      </>
    );
  }

  if (artworkList == null || artworkList == undefined) {
    return null;
  }
}
