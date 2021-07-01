import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const DetailPage = (list) => {
  //console.log(list);
  let info = list.location.state.list;
  //console.log(info);

  const deletePost = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8888/post/${info.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json(); // 실제로는 이렇게 하지마라~~~json으로 받아라
      })
      .then((res) => {
        console.log(res);
        // body 데이터가 들어옴
        if (res.code === 1) {
          console.log("통신성공");
          // 화면 동기화 해야됨
          list.history.push("/");
        } else {
          console.log("통신 실패");
        }
      });
  };

  return (
    <Container>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            {info.id}. {info.title}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {info.created}
          </Card.Subtitle>
          <Card.Text>
            {info.author} : {info.content}
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
      <Link
        to={{
          pathname: `/post/${info.id}`,
          state: { info },
        }}
      >
        <Button>수정하기</Button>
      </Link>
      <Link
        to={{
          pathname: `/post/${info.id}`,
          state: { info },
        }}
      >
        &nbsp;
        <Button onClick={deletePost}>삭제하기</Button>
      </Link>
    </Container>
  );
};

export default DetailPage;
