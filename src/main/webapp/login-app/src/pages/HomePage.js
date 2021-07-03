import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

const HomePage = () => {
  const [lists, setList] = useState([]);

  const getList = async () => {
    let list = await axios.get("http://localhost:8888/post");
    //console.log(1, list);
    setList(list.data.data);
  };

  useEffect(() => {
    getList();
  }, []);

  //console.log(2, lists);
  return (
    <div>
      {lists.map((list) => (
        <Container key={list.id}>
          <Link to={`/post/detail/${list.id}`}>
            <div>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>
                    {list.id}. {list.title}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {list.created}
                  </Card.Subtitle>
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
