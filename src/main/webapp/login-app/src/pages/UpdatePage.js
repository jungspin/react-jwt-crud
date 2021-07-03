import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";

const UpdatePage = (props) => {
  const { user } = useSelector((store) => store);
  //console.log("업데이트!");
  let { match } = props;
  let id = match.params.id;

  const [detail, setDetail] = useState([]);

  const getDetail = async () => {
    await axios({
      method: "GET",
      url: "http://localhost:8888/post/" + id,
    }).then((res) => {
      //console.log(res);
      setDetail(res.data.data);
    });
  };
  //console.log(detail);

  const [update, setUpdate] = useState({
    title: detail.title,
    content: detail.content,
    author: user.username,
  });

  //console.log(detail.title);

  const { title, author, content } = update;

  useEffect(() => {
    getDetail();
  }, []);

  const changeInput = (e) => {
    //console.log(e.target.value);
    const { value, name } = e.target;
    setUpdate({
      ...update,
      [name]: value,
    });
  };
  console.log(update);
  //console.log(title);

  const updateOne = () => {};

  return (
    <Container>
      <Form>
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
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            value={title}
            //readOnly="readOnly"
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

        <Button variant="primary" type="button" onClick={updateOne}>
          수정하기
        </Button>
      </Form>
    </Container>
  );
};

export default UpdatePage;
