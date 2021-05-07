# frozen_string_literal: true

class ApplicationController < ActionController::API
  module Api
    class V1::ApplicationController < ActionController::API
      include Firebase::Auth::Authenticable
      before_action :authenticate_user
    end
  end
end
