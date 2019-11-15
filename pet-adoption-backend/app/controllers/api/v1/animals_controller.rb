class Api::V1::AnimalsController < ApplicationController
    def index
        animals = Animal.all
        render json: animals, except: [:created_at, :updated_at]
    end

    def show
        animal = Animal.find_by(id: params[:id])
        if animal 
            render json: animal, except: [:created_at, :updated_at]
        else
            render json: {message: 'animal not found'}
        end
    end

    def create
        animal = Animal.create(animal_params)
        render json: animal, except: [:created_at, :updated_at]
    end

    def update
        animal = Animal.find(params[:id])
        animal.update(animal_params)
        render json: animal, except: [:created_at, :updated_at]
    end

    def destroy
        animal = Animal.find(params[:id])
        animal.destroy
    end

    private

    def animal_params
        params.require(:animal).permit(:name,:species,:breed,:image,:gender,:age,:status,:description)
    end
end
