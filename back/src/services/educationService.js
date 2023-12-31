// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class EducationService {
  static async addEducation({ user_id, schoolName, schoolType, major, status,startDate, endDate }) {
    // id로 유니크 값 사용
    const id = uuidv4();

    // db에 저장
    const newEducation = { id, user_id, schoolName, schoolType, major, status, startDate, endDate };
    const createdNewEducation = await Education.create({ newEducation });

    return createdNewEducation;
  }

  static async getEducation({ educationId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
    const education = await Education.findById({ educationId });
    if (!education) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return education;
  }

  static async getEducationList({ user_id }) {
    const educations = await Education.findByUserId({ user_id });
    return educations;
  }

  static async setEducation({ educationId, toUpdate }) {
    let education = await Education.findById({ educationId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.schoolName) {
      const fieldToUpdate = "schoolName";
      const newValue = toUpdate.schoolName;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.schoolType) {
      const fieldToUpdate = "schoolType";
      const newValue = toUpdate.schoolType;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }
    
    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }
    
    if (toUpdate.status) {
      const fieldToUpdate = "status";
      const newValue = toUpdate.status;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.startDate) {
      const fieldToUpdate = "startDate";
      const newValue = toUpdate.startDate;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    if (toUpdate.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate;
      education = await Education.update({ educationId, fieldToUpdate, newValue });
    }

    return education;
  }

  static async deleteEducation({ educationId }) {
    const isDataDeleted = await Education.deleteById({ educationId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { EducationService };
