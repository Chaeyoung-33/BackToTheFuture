import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({ currentEducation, setEducations, setIsEditing }) {
  //useState로 title 상태를 생성함.
  const [schoolName, setSchoolName] = useState(currentEducation.schoolName);
  const [schoolType, setSchoolType] = useState(currentEducation.schoolType);
  const [major, setMajor] = useState(currentEducation.major);
  const [status, setStatus] = useState(currentEducation.status);
  const [startDate, setStartDate] = useState(currentEducation.startDate);
  const [endDate, setEndDate] = useState(currentEducation.endDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentEducation의 user_id를 user_id 변수에 할당함.
    const user_id = currentEducation.user_id;

    // "Educations/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`educations/${currentEducation.id}`, {
      user_id,
      schoolName,
      schoolType,
      major,
      status,
      startDate,
      endDate,
    });

    // "educationlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("educationlist", user_id);
    // Educations를 response의 data로 세팅함.
    setEducations(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Floating
        className="mb-3"
        onChange={(e) => setSchoolName(e.target.value)}
      >
        <Form.Control
          id="floatingInputCustom"
          type="text"
          value={schoolName}
          placeholder="예 :00고등학교/00대학교"
        />
        <label htmlFor="floatingInputCustom">학교</label>
      </Form.Floating>

      

      <Form.Select
        aria-label="Default select example"
        value={schoolType}
        onChange={(e) => setSchoolType(e.target.value)}
      >
        <option>학위</option>
        <option value="학사">학사</option>
        <option value="석사">석사</option>
        <option value="박사">박사</option>
      </Form.Select>


      <Form.Floating
        className="mb-3"
        onChange={(e) => setMajor(e.target.value)}
      >
        <Form.Control
          id="floatingInputCustom"
          type="text"
          value={major}
          placeholder="예:경영학"
        />
        <label htmlFor="floatingInputCustom">전공</label>
      </Form.Floating>

      <Form.Select
        aria-label="Default select example2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>상태</option>
        <option value="재학중">재학중</option>
        <option value="휴학">학사</option>
        <option value="수료">석사</option>
        <option value="졸업">졸업</option>
      </Form.Select>

      <Form.Floating
        className="mb-3"
        onChange={(e) => setStartDate(e.target.value)}
      >
        <Form.Control
          id="floatingInputCustom"
          type="text"
          value={startDate}
          placeholder="입학년월 예:2021.03"
        />
        <label htmlFor="floatingInputCustom">입학년월</label>
      </Form.Floating>

      <Form.Floating onChange={(e) => setEndDate(e.target.value)}>
        <Form.Control
          id="floatingPasswordCustom"
          type="text"
          value={endDate}
          placeholder="졸업년월 예:2023.09"
        />
        <label htmlFor="floatingPasswordCustom">졸업년월</label>
      </Form.Floating>

      <Form.Group as={Row} className="mt-3 text-center">
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

export default EducationEditForm;
