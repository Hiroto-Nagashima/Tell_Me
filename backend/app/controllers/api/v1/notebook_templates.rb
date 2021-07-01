module Api
  module V1
    class NotebookTemplatesController < ApplicationController
      def create
      end

      def show
      end

      private

      def notebook_params
        params.require(:notebook_templates).permit(:has_bathed, :breakfast, :dinner)
      end
    end
  end
end
