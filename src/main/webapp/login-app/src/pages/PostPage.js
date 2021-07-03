import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
// 로그인한 사람만 글 쓸 수 있음. post 요청시 토큰 보내기

const PostPage = (props) => {
  const { user } = useSelector((store) => store);

  const [post, setPost] = useState({
    title: "",
    content: "",
    author: user.username,
  });

  const changeInput = (e) => {
    //console.log(e.target.value);
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };
  console.log(post);

  const write = (e) => {
    e.preventDefault();
    fetch("http://localhost:8888/user/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: localStorage.getItem("Authorization"),
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);
        props.history.push("/");
      })
      .catch((error) => {
        // then 내부에서 실패하면!! -> 통신과 상관이 없음!!!! 파싱을 실패한다거나~~
        console.log("에러 발생함");
        console.log(error);
      });
  };

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            name="author"
            type="text"
            value={user.username}
            readOnly="readOnly"
            onChange={changeInput}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            placeholder="Enter title"
            onChange={changeInput}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            name="content"
            type="text"
            placeholder="Enter content"
            onChange={changeInput}
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={write}>
          글쓰기
        </Button>
      </Form>
    </Container>
  );
};

export default PostPage;
