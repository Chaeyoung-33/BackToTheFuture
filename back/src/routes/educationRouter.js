import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { EducationService } from "../services/educationService";

const educationRouter = Router();
educationRouter.use(login_required);

educationRouter.post("/education/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const schoolName = req.body.schoolName;
    const schoolType = req.body.schoolType;
    const major = req.body.major;
    const status = req.body.status;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    // 위 데이터를 유저 db에 추가하기
    const newEducation = await EducationService.addEducation({
      user_id,
      schoolName,
      schoolType,
      major,
      status,
      startDate,
      endDate,
    });

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/educations/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const educationId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 찾기
    const education = await EducationService.getEducation({ educationId });

    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }

    res.status(200).send(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.put("/educations/:id", async function (req, res, next) {
  try {
    // URI로부터 수상 데이터 id를 추출함.
    const educationId = req.params.id;

    // body data 로부터 업데이트할 수상 정보를 추출함.
    const schoolName = req.body.schoolName ?? null;
    const schoolType = req.body.schoolType ?? null;
    const major = req.body.major ?? null;
    const status = req.body.status ?? null;
    const startDate = req.body.startDate ?? null;
    const endDate = req.body.endDate ?? null;

    const toUpdate = {
      schoolName,
      schoolType,
      major,
      status,
      startDate,
      endDate,
    };

    // 위 추출된 정보를 이용하여 db의 데이터 수정하기
    const education = await EducationService.setEducation({
      educationId,
      toUpdate,
    });

    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }

    res.status(200).send(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.delete("/educations/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const educationId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await EducationService.deleteEducation({ educationId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/educationlist/:user_id", async function (req, res, next) {
  try {
    // 특정 사용자의 전체 수상 목록을 얻음
    // @ts-ignore
    const user_id = req.params.user_id;
    const educationList = await EducationService.getEducationList({ user_id });
    res.status(200).send(educationList);
  } catch (error) {
    next(error);
  }
});

export { educationRouter };
