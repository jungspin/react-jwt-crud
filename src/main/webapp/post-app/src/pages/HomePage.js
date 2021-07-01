import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

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
              <Link
                to={{
                  pathname: `/post/detail/${list.id}`,
                  state: { list },
                }}
              >
                상세보기
              </Link>
            </Card>
            <br />
          </div>
        </Container>
      ))}
    </div>
  );
};

export default HomePage;
