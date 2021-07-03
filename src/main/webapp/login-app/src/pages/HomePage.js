import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

// 데이터 요청해서 뿌리기
const HomePage = () => {
  const [lists, setList] = useState([]);

  const getList = async () => {
    let list = await axios.get("http://localhost:8888/post");
    //console.log(list.data.data);
    setList(list.data.data);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      {lists.map((list) => (
        <Container key={list.id}>
          <Link
            to={{
              pathname: `/post/detail/${list.id}`,
              state: { list },
            }}
          >
            <div>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>
                    {list.id}. {list.title}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {list.created}
                  </Card.Subtitle>
                  {/* <Card.Text>{list.content}</Card.Text> */}
                </Card.Body>
              </Card>
              <br />
            </div>
          </Link>
        </Container>
      ))}
    </div>
  );
};

export default HomePage;
