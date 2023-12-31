import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";

import * as Api from "../../api";

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentProject.title);
  const [description, setDescription] = useState(currentProject.description);
  const [startDate, setStartDate] = useState(currentProject.startDate);
  const [endDate, setEndDate] = useState(currentProject.endDate);
  const [archive, setArchive] = useState(currentProject.archive);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentProject의 user_id를 user_id 변수에 할당함.
    const user_id = currentProject.user_id;

    // "projects/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`projects/${currentProject.id}`, {
      user_id,
      title,
      startDate,
      endDate,
      archive,
      description,
    });

    // "projectlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("projectlist", user_id);
    // projects를 response의 data로 세팅함.
    setProjects(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Label>활동 기간</Form.Label>
      <Form.Group controlId="formBasicStartDate" className="mt-3">
        <Form.Control
          type="text"
          placeholder="시작 연월"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEndDate" className="mt-3">
        <Form.Control
          type="text"
          placeholder="완료 연월"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicArchive" className="mt-3">
        <Form.Control
          type="text"
          placeholder="결과물"
          value={archive}
          onChange={(e) => setArchive(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;
