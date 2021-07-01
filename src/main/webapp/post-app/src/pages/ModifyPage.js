import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const ModifyPage = (info) => {
  //console.log(info);
  let data = info.location.state.info;
  //console.log(data);

  const [updateData, setupdateData] = useState({
    title: data.title,
    content: data.content,
    author: data.author,
  });

  const { title, author, content } = updateData;

  const update = (e) => {
    // event 를 받음
    e.preventDefault(); // submit 액션 차단
    fetch(`http://localhost:8888/post/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => {
        return res.json(); // 실제로는 이렇게 하지마라~~~json으로 받아라
      })
      .then((res) => {
        //console.log(res);
        // body 데이터가 들어옴
        if (res.code === 1) {
          console.log("통신성공");
          // 화면 동기화 해야됨
          info.history.push("/");
        } else {
          console.log("통신 실패");
        }
      });
  };

  const changeInput = (e) => {
    console.log(e.target.value);
    const { value, name } = e.target;
    setupdateData({
      ...updateData,
      [name]: value,
    });
  };
  //console.log(updateData);

  return (
    <div>
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              value={title}
              onChange={changeInput}
            />
            {/* <input
              type="text"
              name="title"
              onChange={changeInput}
              value={title}
            ></input> */}
          </Form.Group>

          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              name="author"
              type="text"
              value={author}
              readOnly="readOnly"
              onChange={changeInput}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              name="content"
              type="text"
              value={content}
              onChange={changeInput}
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={update}>
            글쓰기
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ModifyPage;
