module Api
  module V1
    class NotebooksController < ApplicationController
      def create
        kid = Kid.find(params[:kid_id])
        notebook = kid.notebooks.build(notebook_params)
        if notebook.save!
          render json: {
            message: "登録が完了しました"
          }, status: 200
        else
          render json: {
            status: "422",
            message: notebook.errors.full_messages
          },status: 422
        end
      end

      def update
        kid = Kid.find(params[:kid_id])
        notebook = kid.notebooks.find_by(id: params[:id])
        if notebook.update!(notebook_params)
          render json: {
            message: "更新が完了しました"
          }, status: 200
        else
          render json: {
            message: "更新に失敗しました"
          }, status: 400
        end
      end

      def fetch_notebook
        kid = Kid.find(params[:kid_id])
        date = params[:date]
        # 年月日を切り出す
        new_date = date.slice(0..9)
        notebooks = kid.notebooks.where(date: new_date)
        notebook = notebooks.last
        if notebook.present?
          render json: notebook, status: 200
        else
          @notebook= kid.notebooks.build
          render json: @notebook, status: 200
        end
      end

      private

      def notebook_params
        params.require(:notebook).permit(:body_temperature, :has_bathed, :breakfast, :dinner, :memo, :date)
      end
    end
  end
end
