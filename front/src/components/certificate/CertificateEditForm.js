import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CertificateEditForm({
  currentCertificate,
  setCertificates,
  setIsEditing,
}) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentCertificate.title);
  const [authority, setAuthority] = useState(currentCertificate.authority);
  const [registerNum, setRegisterNum] = useState(currentCertificate.registerNum);
  const [grade, setGrade] = useState(currentCertificate.grade);


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentProject의 user_id를 user_id 변수에 할당함.
    const user_id = currentCertificate.user_id;

    // "projects/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`certificates/${currentCertificate.id}`, {
      user_id,
      title,
      authority,
      registerNum,
      grade,
    });

    // "projectlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("certificatelist", user_id);
    // projects를 response의 data로 세팅함.
    setCertificates(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="자격증"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicAuthority" className="mt-3">
        <Form.Control
          type="text"
          placeholder="발급기관"
          value={authority}
          onChange={(e) => setAuthority(e.target.value)}
        />
      </Form.Group>

      <Form.Label>자격증번호</Form.Label>
      <Form.Group controlId="formBasicRegisterNum" className="mt-3">
        <Form.Control
          type="text"
          placeholder="자격증번호"
          value={registerNum}
          onChange={(e) => setRegisterNum(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicGrade" className="mt-3">
        <Form.Control
          type="text"
          placeholder="등급"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
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

export default CertificateEditForm;
