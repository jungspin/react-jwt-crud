import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const PostPage = (props) => {
  const [board, setBoard] = useState({
    title: "",
    content: "",
    author: "",
  });

  const write = (e) => {
    // event 를 받음
    e.preventDefault(); // submit 액션 차단
    fetch("http://localhost:8888/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(board),
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
          props.history.push("/");
        } else {
          console.log("통신 실패");
        }
      });
  };

  const changeInput = (e) => {
    //console.log(e.target.value);
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };
  //console.log(board);
  return (
    <Container>
      <Form>
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
          <Form.Label>Author</Form.Label>
          <Form.Control
            name="author"
            type="text"
            placeholder="Enter author"
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
