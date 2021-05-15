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

  def findByDate
    target_date = params[:target_date]
    new_date = target_date.slice(0..9)
    notebook = CommunicationNotebook.where("date like?", "#{new_date}%")
    if notebook.present?
      render json: notebook
    else
      @notebook= CommunicationNotebook.new
      @notebook.mood = 1
      render json: @notebook
    end
  end

  def doesExist
    target_date = params[:target_date]
    new_date = target_date.slice(0..9)
    notebook = CommunicationNotebook.where("date like?", "#{new_date}%")
    if notebook.present?
      render json: {
        status: "already exist"
      }
    else
      render json: {
        status: "no data"
      }
    end
  end

  private

  def notebook_params
    params.require(:notebook).permit(:body_temperature, :has_bath, :breakfast, :dinner, :memo, :date)
  end
end
