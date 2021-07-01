module Api
  module V1
    class NotebookTemplatesController < ApplicationController
      def create
        kid = Kid.find(params[:kid_id])
        notebook_templates = kid.notebook_templates.build(notebook_templates_params)
        if notebook_templates.save!
          render json: {
            status: 200,
            message: "登録が完了しました"
          }
        else
          render json: {
            status: "422",
            message: notebook_templates.errors.full_messages
          }
        end
      end

      def show
        kid = Kid.find(params[:kid_id])
        notebook_template = NotebookTemplate.where(kid_id: kid.id, id: params[:id])
        render json: notebook_template
      end

      def index
        kid = Kid.find(params[:kid_id])
        notebook_template = NotebookTemplate.where(kid_id: kid.id, id: params[:id]).last(3)
        render json: notebook_templates
      end

      private

      def notebook_templates_params
        params.require(:notebook_template).permit(:has_bathed, :breakfast, :dinner)
      end
    end
  end
end
