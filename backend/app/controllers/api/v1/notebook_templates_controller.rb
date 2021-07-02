module Api
  module V1
    class NotebookTemplatesController < ApplicationController
      def create
        kid = Kid.find(params[:kid_id])
        notebook_templates = kid.notebook_templates.build(notebook_templates_params)
        if notebook_templates.save!
          new_notebook_templates = NotebookTemplate.where(kid_id: params[:kid_id]).last(3)
          render json: {
            message: "登録が完了しました",
            notebook_templates: new_notebook_templates
          }, status: 200
        else
          render json: {
            message: notebook_templates.errors.full_messages
          }, status: 422
        end
      end

      def show
        kid = Kid.find(params[:kid_id])
        notebook_template = NotebookTemplate.where(kid_id: kid.id, id: params[:id])
        render json: notebook_template, status: 200
      end

      def index
        notebook_templates = NotebookTemplate.where(kid_id: params[:kid_id]).last(3)
        render json:  notebook_templates, status: 200
      end

      private

      def notebook_templates_params
        params.require(:notebook_template).permit(:has_bathed, :breakfast, :dinner)
      end
    end
  end
end
