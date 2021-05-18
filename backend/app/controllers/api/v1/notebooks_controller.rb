class Api::V1::CommunicationNotebooksController < ApplicationController
  def create
    @kid = Kid.find(params[:kid_id])
    @notebook = @kid.notebooks.build(notebook_params)
    if @notebook.save!
      render json: {
        status: "ok"
      }
    else
      render json: {
        status: 400,
        message: "未入力箇所があります"
      }
    end
  end

  def update
    kid = Kid.find(params[:kid_id])
    notebook = kid.notebooks.find_by(id: params[:id])
    if notebook.update(notebook_params)
      render json: {
        status: "ok"
      }
    else
      render json: {
        status: 400,
        message: "未入力箇所があります"
      }
    end
  end

  def index
    kid = Kid.find(params[:kid_id])
    notebooks = kid.notebooks
    render json: notebooks
  end

  def fetchNotebook
    kid = Kid.find(params[:id])
    date = params[:date]
    new_date = date.slice(0..9)
    notebook = kid.notebooks.find_by(created_at: "#{new_date}%")
    if notebook.present?
      render json: notebook
    else
      @notebook= kid.notebooks.build
      render json: @notebook
    end
  end

  private

  def notebook_params
    params.require(:notebook).permit(:body_temperature, :has_bath, :breakfast, :dinner, :memo, :date)
  end
end
