module Api
  module V1
    class NotebooksController < ApplicationController
      def create
        kid = Kid.find(params[:kid_id])
        notebook = kid.notebooks.build(notebook_params)
        if notebook.save
          render json: {
            status: "ok",
            message: "登録が完了しました"
          }
        else
          render json: {
            status: "422",
            message: notebook.errors.full_messages
          }
        end
      end

      def update
        kid = Kid.find(params[:kid_id])
        notebook = kid.notebooks.find_by(id: params[:id])
        if notebook.update!(notebook_params)
          render json: {
            status: "ok",
            message: "更新が完了しました"
          }
        else
          render json: {
            status: 400,
            message: "更新に失敗しました"
          }
        end
      end

      def index
        kid = Kid.find(params[:kid_id])
        notebooks = kid.notebooks
        render json: notebooks
      end

      def fetch_notebook
        kid = Kid.find(params[:kid_id])
        date = params[:date]
        new_date = date.slice(0..9)
        notebook = kid.notebooks.find_by(date: new_date)
        if notebook.present?
          render json: notebook
        else
          @notebook= kid.notebooks.build
          render json: @notebook
        end
      end

      private

      def notebook_params
        params.require(:notebook).permit(:body_temperature, :has_bathed, :breakfast, :dinner, :memo, :date)
      end
    end
  end
end
