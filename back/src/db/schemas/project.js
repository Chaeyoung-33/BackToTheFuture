import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    archive: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//modgoDB에서 데이터 일고 쓰는 작업 수행하는 모델 객체 생성함수(모델이름, 스키마객체)
const ProjectModel = model("Project", ProjectSchema); //이제 ProjectModel.find()같은거 쓸수있음

export { ProjectModel };
