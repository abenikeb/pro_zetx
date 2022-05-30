<template>
  <div class="w-full mx-auto">
    <h1 class="mb-2 border-b text-md font-bold">Transportation data</h1>
    <div class="flex flex-col gap-y-7">
      <!-- the tabs -->
      <div class="hidden md:inline-block">
        <div class="flex w-full gap-x-7 mt-5">
          <div
            class="
              h-8
              cursor-pointer
              rounded-lg
              px-2
              transition
              duration-500
              delay-75
            "
            :class="
              transportSection == 'personal'
                ? 'bg-accent text-white rounded-md'
                : 'hover:bg-gray-200'
            "
            @click="transportSection = 'personal'"
          >
            <h1 class="m-1">Personal Vehicle</h1>
          </div>
          <div
            class="
              h-8
              cursor-pointer
              rounded-lg
              px-1
              transition
              duration-500
              delay-75
            "
            :class="
              transportSection == 'land'
                ? 'bg-accent text-white rounded-md'
                : 'hover:bg-gray-200'
            "
            @click="transportSection = 'land'"
          >
            <h1 class="m-1">Land Transportation</h1>
          </div>
          <div
            class="
              h-8
              cursor-pointer
              rounded-lg
              px-1
              transition
              duration-500
              delay-75
            "
            :class="
              transportSection == 'avation'
                ? 'bg-accent text-white rounded-md'
                : 'hover:bg-gray-200'
            "
            @click="transportSection = 'avation'"
          >
            <h1 class="m-1">Aviation & Maritime</h1>
          </div>
        </div>
      </div>
      <div class="inline-block md:hidden mt-5">
        <select
          id="measure-section"
          v-model="transportSection"
          class="w-full p-3 mb-5 md:hidden rounded-2xl shadow-lg border"
          name="measure-section"
        >
          <option class="px-3" value="personal">Personal Vehicle</option>
          <option class="px-3" value="land">Land Transportation</option>
          <option class="px-3" value="avation">Aviation & Maritime</option>
        </select>
      </div>
      <!-- personal -->
      <div
        v-if="transportSection == 'personal'"
        class="flex w-full gap-x-3 md:gap-x-8"
      >
        <div
          class="
            w-16
            cursor-pointer
            tooltip tooltip-bottom
            transition
            duration-500
            delay-75
          "
          data-tip="Diesel"
          :class="{
            'bg-accent rounded-md':
              personalSection == 'diesel' && transportSection == 'personal',
          }"
          @click="personalSection = 'diesel'"
        >
          <img src="~/assets/images/measure/Diesel.svg" alt="" class="p-3" />
        </div>
        <div
          class="
            w-16
            cursor-pointer
            tooltip tooltip-bottom
            transition
            duration-500
            delay-75
          "
          data-tip="Petrol"
          :class="{
            'bg-accent rounded-md':
              personalSection == 'petrol' && transportSection == 'personal',
          }"
          @click="personalSection = 'petrol'"
        >
          <img src="~/assets/images/measure/Petrol.svg" alt="" class="p-3" />
        </div>
        <div
          class="
            w-16
            cursor-pointer
            tooltip tooltip-bottom
            transition
            duration-500
            delay-75
          "
          data-tip="Electric"
          :class="{
            'bg-accent rounded-md':
              personalSection == 'electric' && transportSection == 'personal',
          }"
          @click="personalSection = 'electric'"
        >
          <img
            src="~/assets/images/measure/electricity-slider.svg"
            alt=""
            class="p-3 w-14"
          />
        </div>
        <div
          class="
            w-16
            cursor-pointer
            tooltip tooltip-bottom
            transition
            duration-500
            delay-75
          "
          data-tip="Hybrid"
          :class="{
            'bg-accent rounded-md':
              personalSection == 'hybrid' && transportSection == 'personal',
          }"
          @click="personalSection = 'hybrid'"
        >
          <img
            src="~/assets/images/measure/hybrid.svg"
            alt=""
            class="p-3 w-16"
          />
        </div>
      </div>
      <!-- land -->
      <div
        v-if="transportSection == 'land'"
        class="flex flex-col gap-y-5 w-full"
      >
        <div class="flex gap-x-4 md:gap-x-8">
          <div
            class="
              w-32
              md:w-16
              cursor-pointer
              tooltip
              transition
              duration-500
              delay-75
            "
            data-tip="Local Bus"
            :class="{
              'bg-accent rounded-md':
                landSection == 'localBus' && transportSection == 'land',
            }"
            @click="landSection = 'localBus'"
          >
            <img
              src="~/assets/images/measure/local-bus.svg"
              alt=""
              class="p-3 w-32 md:w-16"
            />
          </div>
          <div
            class="
              md:w-16
              w-32
              cursor-pointer
              tooltip
              transition
              duration-500
              delay-75
            "
            data-tip="Average Bus"
            :class="{
              'bg-accent rounded-md':
                landSection == 'averageBus' && transportSection == 'land',
            }"
            @click="landSection = 'averageBus'"
          >
            <img
              src="~/assets/images/measure/average-bus.svg"
              alt=""
              class="p-3 md:w-16 w-32"
            />
          </div>
          <div
            class="
              md:w-16
              w-32
              cursor-pointer
              tooltip
              transition
              duration-500
              delay-75
            "
            data-tip="London Bus"
            :class="{
              'bg-accent rounded-md':
                landSection == 'londonBus' && transportSection == 'land',
            }"
            @click="landSection = 'londonBus'"
          >
            <img
              src="~/assets/images/measure/london-bus.svg"
              alt=""
              class="p-3 md:w-16 w-32"
            />
          </div>
          <div
            class="
              md:w-16
              w-32
              cursor-pointer
              tooltip
              transition
              duration-500
              delay-75
            "
            data-tip="Coach"
            :class="{
              'bg-accent rounded-md':
                landSection == 'coach' && transportSection == 'land',
            }"
            @click="landSection = 'coach'"
          >
            <img
              src="~/assets/images/measure/coach.svg"
              alt=""
              class="p-3 md:w-16 w-32"
            />
          </div>
        </div>
        <div class="flex gap-x-4 md:gap-x-8">
          <div
            class="
              md:w-16
              w-32
              cursor-pointer
              tooltip tooltip-bottom
              transition
              duration-500
              delay-75
            "
            data-tip="National Train"
            :class="{
              'bg-accent rounded-md':
                landSection == 'nationalTrain' && transportSection == 'land',
            }"
            @click="landSection = 'nationalTrain'"
          >
            <img
              src="~/assets/images/measure/national-train.svg"
              alt=""
              class="p-3 md:w-16 w-32"
            />
          </div>
          <div
            class="
              md:w-16
              w-32
              cursor-pointer
              tooltip tooltip-bottom
              transition
              duration-500
              delay-75
            "
            data-tip="Light Train"
            :class="{
              'bg-accent rounded-md':
                landSection == 'lightTrain' && transportSection == 'land',
            }"
            @click="landSection = 'lightTrain'"
          >
            <img
              src="~/assets/images/measure/Light Train & Tram.svg"
              alt=""
              class="p-3 md:w-16 w-32"
            />
          </div>
          <div
            class="
              md:w-16
              w-32
              cursor-pointer
              tooltip tooltip-bottom
              transition
              duration-500
              delay-75
            "
            data-tip="London Underground"
            :class="{
              'bg-accent rounded-md':
                landSection == 'londonUnderground' &&
                transportSection == 'land',
            }"
            @click="landSection = 'londonUnderground'"
          >
            <img
              src="~/assets/images/measure/London-Underground.svg"
              alt=""
              class="p-3 md:w-16 w-32"
            />
          </div>
          <div
            class="
              md:w-16
              w-32
              cursor-pointer
              tooltip tooltip-bottom
              transition
              duration-500
              delay-75
            "
            data-tip="International Train"
            :class="{
              'bg-accent rounded-md':
                landSection == 'internationalTrain' &&
                transportSection == 'land',
            }"
            @click="landSection = 'internationalTrain'"
          >
            <img
              src="~/assets/images/measure/International-Train.svg"
              alt=""
              class="p-3 md:w-16 w-32"
            />
          </div>
        </div>
      </div>
      <!-- Aviation -->
      <div
        v-if="transportSection == 'avation'"
        class="flex flex-col gap-y-5 md:gap-y-7"
      >
        <div class="flex gap-x-6 md:gap-x-8">
          <div
            class="
              w-32
              md:w-28
              h-16
              cursor-pointer
              tooltip
              transition
              duration-500
              delay-75
              z-50
            "
            data-tip="Large Motor Saling Boat"
            :class="{
              'bg-accent rounded-md':
                avationSection == 'sailingBoat' &&
                transportSection == 'avation',
            }"
            @click="avationSection = 'sailingBoat'"
          >
            <img
              src="~/assets/images/measure/Large-motor-sailing-boat.svg"
              alt=""
              class="p-3 w-44"
            />
          </div>
          <div
            class="
              w-32
              md:w-28
              h-16
              cursor-pointer
              tooltip
              transition
              duration-500
              delay-75
            "
            data-tip="Large Motor Boat"
            :class="{
              'bg-accent rounded-md':
                avationSection == 'largeMotorBoat' &&
                transportSection == 'avation',
            }"
            @click="avationSection = 'largeMotorBoat'"
          >
            <img
              src="~/assets/images/measure/Large-motorboat.svg"
              alt=""
              class="p-3 w-44"
            />
          </div>
          <div
            class="
              w-44
              md:w-28
              h-16
              cursor-pointer
              tooltip
              transition
              duration-500
              delay-75
            "
            data-tip="Domestic Flight"
            :class="{
              'bg-accent rounded-md':
                avationSection == 'domesticFlight' &&
                transportSection == 'avation',
            }"
            @click="avationSection = 'domesticFlight'"
          >
            <img
              src="~/assets/images/measure/Domestic.svg"
              alt=""
              class="p-3 w-44 mt-3"
            />
          </div>
        </div>
        <div class="flex gap-x-6 md:gap-x-8">
          <div
            class="
              w-32
              md:w-28
              h-16
              cursor-pointer
              tooltip tooltip-bottom
              transition
              duration-500
              delay-75
            "
            data-tip="Short Flight"
            :class="{
              'bg-accent rounded-md':
                avationSection == 'shortFlight' &&
                transportSection == 'avation',
            }"
            @click="avationSection = 'shortFlight'"
          >
            <img
              src="~/assets/images/measure/Shortflight.svg"
              alt=""
              class="p-3 w-44"
            />
          </div>
          <div
            class="
              w-32
              md:w-28
              h-16
              cursor-pointer
              tooltip tooltip-bottom
              transition
              duration-500
              delay-75
            "
            data-tip="Long Flight"
            :class="{
              'bg-accent rounded-md':
                avationSection == 'longFlight' && transportSection == 'avation',
            }"
            @click="avationSection = 'longFlight'"
          >
            <img
              src="~/assets/images/measure/Longflight.svg"
              alt=""
              class="p-3 w-44"
            />
          </div>
          <div
            class="
              w-28
              md:w-24
              h-16
              cursor-pointer
              tooltip tooltip-bottom
              transition
              duration-500
              delay-75
            "
            data-tip="International Flight"
            :class="{
              'bg-accent rounded-md':
                avationSection == 'internationalFlight' &&
                transportSection == 'avation',
            }"
            @click="avationSection = 'internationalFlight'"
          >
            <img
              src="~/assets/images/measure/International.svg"
              alt=""
              class="p-3 w-20"
            />
          </div>
        </div>
      </div>
      <!-- the slider section -->
      <div
        v-if="transportSection == 'personal' && personalSection == 'diesel'"
        class="w-full mt-7 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">Diesel</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img
                src="~/assets/images/measure/transportation-slider.svg"
                alt=""
              />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.diesel > 2000 ? 2000 : travelDataEntry.diesel
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="personalValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 inline-block md:hidden w-full">
              <vue-slider
                :value="
                  travelDataEntry.diesel > 2000 ? 2000 : travelDataEntry.diesel
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="personalValue($event)"
              ></vue-slider>
            </div>

            <div class="md:inline-block hidden">
              <div class="w-1/10 flex">
                <img
                  src="~/assets/images/measure/transportation-slider.svg"
                  alt=""
                />
                <img
                  src="~/assets/images/measure/transportation-slider.svg"
                  alt=""
                />
                <img
                  src="~/assets/images/measure/transportation-slider.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="diesel"
                :value="travelDataEntry.diesel"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="personalInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="transportSection == 'personal' && personalSection == 'petrol'"
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">Petrol</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img
                src="~/assets/images/measure/transportation-slider.svg"
                alt=""
              />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.petrol > 2000 ? 2000 : travelDataEntry.petrol
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="personalValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full inline-block md:hidden">
              <vue-slider
                :value="
                  travelDataEntry.petrol > 2000 ? 2000 : travelDataEntry.petrol
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="personalValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img
                  src="~/assets/images/measure/transportation-slider.svg"
                  alt=""
                />
                <img
                  src="~/assets/images/measure/transportation-slider.svg"
                  alt=""
                />
                <img
                  src="~/assets/images/measure/transportation-slider.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="petrol"
                :value="travelDataEntry.petrol"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="personalInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="transportSection == 'personal' && personalSection == 'electric'"
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">Electric</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img
                src="~/assets/images/measure/transportation-slider.svg"
                alt=""
              />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.electric > 2000
                    ? 2000
                    : travelDataEntry.electric
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="personalValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full inline-block md:hidden">
              <vue-slider
                :value="
                  travelDataEntry.electric > 2000
                    ? 2000
                    : travelDataEntry.electric
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="personalValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img
                  src="~/assets/images/measure/transportation-slider.svg"
                  alt=""
                />
                <img
                  src="~/assets/images/measure/transportation-slider.svg"
                  alt=""
                />
                <img
                  src="~/assets/images/measure/transportation-slider.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="electric"
                :value="travelDataEntry.electric"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="personalInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="transportSection == 'personal' && personalSection == 'hybrid'"
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">Hybrid</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img
                src="~/assets/images/measure/transportation-slider.svg"
                alt=""
              />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.hybrid > 2000 ? 2000 : travelDataEntry.hybrid
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="personalValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full inline-block md:hidden">
              <vue-slider
                :value="
                  travelDataEntry.hybrid > 2000 ? 2000 : travelDataEntry.hybrid
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="personalValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img
                  src="~/assets/images/measure/transportation-slider.svg"
                  alt=""
                />
                <img
                  src="~/assets/images/measure/transportation-slider.svg"
                  alt=""
                />
                <img
                  src="~/assets/images/measure/transportation-slider.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="hybrid"
                :value="travelDataEntry.hybrid"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="personalInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="transportSection == 'land' && landSection == 'localBus'"
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">Local Bus</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img src="~/assets/images/measure/land-slider.svg" alt="" />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.localBus > 2000
                    ? 2000
                    : travelDataEntry.localBus
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="landValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full inline-block md:hidden">
              <vue-slider
                :value="
                  travelDataEntry.localBus > 2000
                    ? 2000
                    : travelDataEntry.localBus
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="landValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="localBus"
                :value="travelDataEntry.localBus"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="landInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="transportSection == 'land' && landSection == 'averageBus'"
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">Average Bus</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img src="~/assets/images/measure/land-slider.svg" alt="" />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.averageBus > 2000
                    ? 2000
                    : travelDataEntry.averageBus
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="landValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full inline-block md:hidden">
              <vue-slider
                :value="
                  travelDataEntry.averageBus > 2000
                    ? 2000
                    : travelDataEntry.averageBus
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="landValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="averageBus"
                :value="travelDataEntry.averageBus"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="landInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="transportSection == 'land' && landSection == 'londonBus'"
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">London Bus</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img src="~/assets/images/measure/land-slider.svg" alt="" />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.londonBus > 2000
                    ? 2000
                    : travelDataEntry.londonBus
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="landValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full inline-block md:hidden">
              <vue-slider
                :value="
                  travelDataEntry.londonBus > 2000
                    ? 2000
                    : travelDataEntry.londonBus
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="landValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="londonBus"
                :value="travelDataEntry.londonBus"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="landInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="transportSection == 'land' && landSection == 'coach'"
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">Coach</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img src="~/assets/images/measure/land-slider.svg" alt="" />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.coach > 2000 ? 2000 : travelDataEntry.coach
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="landValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full inline-block md:hidden">
              <vue-slider
                :value="
                  travelDataEntry.coach > 2000 ? 2000 : travelDataEntry.coach
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="landValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="coach"
                :value="travelDataEntry.coach"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="landInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="transportSection == 'land' && landSection == 'nationalTrain'"
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">National Train</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img src="~/assets/images/measure/land-slider.svg" alt="" />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.nationalTrain > 2000
                    ? 2000
                    : travelDataEntry.natinalTrain
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="landValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full inline-block md:hidden">
              <vue-slider
                :value="
                  travelDataEntry.nationalTrain > 2000
                    ? 2000
                    : travelDataEntry.nationalTrain
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="landValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="natinalTrain"
                :value="travelDataEntry.nationalTrain"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="landInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="transportSection == 'land' && landSection == 'lightTrain'"
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">Light Train</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img src="~/assets/images/measure/land-slider.svg" alt="" />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.lightTrain > 2000
                    ? 2000
                    : travelDataEntry.lightTrain
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="landValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full inline-block md:hidden">
              <vue-slider
                :value="
                  travelDataEntry.lightTrain > 2000
                    ? 2000
                    : travelDataEntry.lightTrain
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="landValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="lightTrain"
                :value="travelDataEntry.lightTrain"
                type="number"
                placeholder="Enter a number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="landInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="transportSection == 'land' && landSection == 'londonUnderground'"
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">London Underground</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img src="~/assets/images/measure/land-slider.svg" alt="" />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.londonUnderground > 2000
                    ? 2000
                    : travelDataEntry.londonUnderground
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="landValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full inline-block md:hidden">
              <vue-slider
                :value="
                  travelDataEntry.londonUnderground > 2000
                    ? 2000
                    : travelDataEntry.londonUnderground
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="landValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="londonUnderground"
                :value="travelDataEntry.londonUnderground"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="landInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="transportSection == 'land' && landSection == 'internationalTrain'"
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">International Train</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img src="~/assets/images/measure/land-slider.svg" alt="" />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.internationalTrain > 2000
                    ? 2000
                    : travelDataEntry.internationalTrain
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="landValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full inline-block md:hidden">
              <vue-slider
                :value="
                  travelDataEntry.internationalTrain > 2000
                    ? 2000
                    : travelDataEntry.internationalTrain
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="landValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="internationalTrain"
                :value="travelDataEntry.internationalTrain"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="landInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <!-- Aviation -->
      <div
        v-if="transportSection == 'avation' && avationSection == 'sailingBoat'"
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">Large Motor Sailing Boat</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img src="~/assets/images/measure/land-slider.svg" alt="" />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.sailingBoat > 2000
                    ? 2000
                    : travelDataEntry.sailingBoat
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="aviationValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full md:hidden inline-block">
              <vue-slider
                :value="
                  travelDataEntry.sailingBoat > 2000
                    ? 2000
                    : travelDataEntry.sailingBoat
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="aviationValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="sailingBoat"
                :value="travelDataEntry.sailingBoat"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="aviationInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="
          transportSection == 'avation' && avationSection == 'largeMotorBoat'
        "
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">Large Motor Boat</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img src="~/assets/images/measure/land-slider.svg" alt="" />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.largeMotorBoat > 2000
                    ? 2000
                    : travelDataEntry.largeMotorBoat
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="aviationValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full md:hidden inline-block">
              <vue-slider
                :value="
                  travelDataEntry.largeMotorBoat > 2000
                    ? 2000
                    : travelDataEntry.largeMotorBoat
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="aviationValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="largeMotorBoat"
                :value="travelDataEntry.largeMotorBoat"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="aviationInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="
          transportSection == 'avation' && avationSection == 'domesticFlight'
        "
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">Domestic Flight</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img src="~/assets/images/measure/land-slider.svg" alt="" />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.domesticFlight > 2000
                    ? 2000
                    : travelDataEntry.domesticFlight
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="aviationValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full md:hidden inline-block">
              <vue-slider
                :value="
                  travelDataEntry.domesticFlight > 2000
                    ? 2000
                    : travelDataEntry.domesticFlight
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="aviationValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="domesticFlight"
                :value="travelDataEntry.domesticFlight"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="aviationInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="transportSection == 'avation' && avationSection == 'shortFlight'"
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">Short Flight</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img src="~/assets/images/measure/land-slider.svg" alt="" />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.shortFlight > 2000
                    ? 2000
                    : travelDataEntry.shortFlight
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="aviationValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full md:hidden inline-block">
              <vue-slider
                :value="
                  travelDataEntry.shortFlight > 2000
                    ? 2000
                    : travelDataEntry.shortFlight
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="aviationValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="shortFlight"
                :value="travelDataEntry.shortFlight"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="aviationInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="transportSection == 'avation' && avationSection == 'longFlight'"
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">Long Flight</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img src="~/assets/images/measure/land-slider.svg" alt="" />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.longFlight > 2000
                    ? 2000
                    : travelDataEntry.longFlight
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="aviationValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full md:hidden inline-block">
              <vue-slider
                :value="
                  travelDataEntry.longFlight > 2000
                    ? 2000
                    : travelDataEntry.longFlight
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="aviationValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="longFlight"
                :value="travelDataEntry.longFlight"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="aviationInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="
          transportSection == 'avation' &&
          avationSection == 'internationalFlight'
        "
        class="w-full mt-3 md:mt-10"
      >
        <h1 class="font-bold text-sm text-center">International Flight</h1>
        <div class="mt-5 flex-col justify-center items-center gap-y-5">
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10 hidden md:inline-block">
              <img src="~/assets/images/measure/land-slider.svg" alt="" />
            </div>
            <div class="mx-14 my-5 w-full hidden md:inline-block">
              <vue-slider
                :value="
                  travelDataEntry.internationalFlight > 2000
                    ? 2000
                    : travelDataEntry.internationalFlight
                "
                :min="min"
                :max="max"
                :marks="marks"
                :tooltip-placement="'bottom'"
                @change="aviationValue($event)"
              ></vue-slider>
            </div>
            <div class="my-5 w-full md:hidden inline-block">
              <vue-slider
                :value="
                  travelDataEntry.internationalFlight > 2000
                    ? 2000
                    : travelDataEntry.internationalFlight
                "
                :min="min"
                :max="max"
                :marks="mobileMarks"
                :tooltip-placement="'bottom'"
                @change="aviationValue($event)"
              ></vue-slider>
            </div>
            <div class="hidden md:inline-block">
              <div class="w-1/10 flex">
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
                <img src="~/assets/images/measure/land-slider.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center w-full gap-y-5">
            <h1 class="text-xs font-bold mt-5">OR</h1>
            <div class="flex w-full justify-center items-center gap-x-4">
              <input
                id="internationalFlight"
                :value="travelDataEntry.internationalFlight"
                type="number"
                class="
                  input input-sm input-accent
                  text-center
                  w-full
                  md:w-48 md:ml-2
                  mt-2
                  md:mt-0
                "
                @input="aviationInputChange($event)"
              />
              <h1 class="text-sm font-bold">KM</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center w-full gap-x-5 md:gap-x-7 mt-5 md:mt-0">
        <button class="btn btn-sm" @click.prevent="$emit('sectionSubmit')">
          Skip
        </button>
        <button
          id="submit"
          class="
            btn btn-sm
            border-accent
            text-accent
            hover:text-white hover:bg-accent
          "
          type="submit"
          @click.prevent="submitTransportationData"
        >
          Submit
        </button>
      </div>
    </div>
    <!-- <form @submit.prevent="">
      <div class="mb-2 pb-2 border-b">
        <h1 class="text-lg font-semibold mb-2">Personal Car</h1>
        <div class="form-control mb-2">
          <label class="text-sm"> Car type (size) </label>
          <select
            id="carType"
            v-model="travelDataEntry.carSize"
            class="select select-sm select-bordered w-full"
          >
            <option disabled="disabled" selected="selected" :value="null">
              Select your car's size
            </option>
            <option value="small">Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>

        <div class="form-control mb-2">
          <label class="text-sm"> Fuel type </label>
          <select
            id="fuelType"
            v-model="travelDataEntry.fuelType"
            class="select select-sm select-bordered w-full"
          >
            <option disabled="disabled" selected="selected" :value="null">
              Select fuel type
            </option>
            <option value="diesel">Diesel</option>
            <option>Petrol</option>
            <option>Electric</option>
            <option>Hybrid</option>
          </select>
        </div>

        <div class="form-control mb-2">
          <label class="text-sm"> Kilometerage (Km) </label>
          <input
            id="carKm"
            v-model="travelDataEntry.kilometerage"
            type="number"
            placeholder="#Km"
            class="input input-sm"
          />
        </div>
      </div>
      <div class="mb-2 pb-2 border-b">
        <h1 class="text-lg font-semibold mb-2">City Bus</h1> -->
    <!-- <div class="form-control mb-2">
          <label class="text-sm"> Bus capacity </label>
          <input
            v-model="travelDataEntry.kilometerage"
            type="number"
            placeholder="#Km"
            class="input input-sm "
          />
        </div> -->
    <!-- <div class="form-control">
          <label for="">Bus types</label>
          <select
            id="busType"
            v-model="travelDataEntry.busType"
            class="select select-sm select-bordered w-full"
          >
            <option disabled="disabled" selected="selected" :value="null">
              Select your bus type
            </option>
            <option value="Local bus">Local bus</option>
            <option>Average bus</option>
            <option>Local London bus</option>
            <option>Coach</option>
          </select>
        </div>
        <div class="form-control mt-4">
          <label class="text-sm"> Commute distance (Km)</label>
          <input
            id="busKm"
            v-model="travelDataEntry.busKilometerage"
            type="number"
            placeholder="#Km"
            class="input input-sm"
          />
        </div>
      </div>

      <div class="mb-2 pb-2 border-b">
        <h1 class="text-lg font-semibold mb-2">Train</h1>
        <div class="form-control">
          <label for="">Train types</label>
          <select
            id="trainType"
            v-model="travelDataEntry.trainType"
            class="select select-sm select-bordered w-full"
          >
            Train types
            <option disabled="disabled" selected="selected" :value="null">
              Select train type
            </option>
            <option value="National train">National train</option>
            <option>Light train and tram</option>
            <option>London underground</option>
            <option>International train</option>
          </select>
        </div>
        <div class="form-control mb-2 mt-4">
          <label class="text-sm"> Commute distance (Km)</label>
          <input
            id="trainKm"
            v-model="travelDataEntry.trainKilometerage"
            type="number"
            placeholder="#Km"
            class="input input-sm"
          />
        </div>
      </div> -->

    <!-- <div class="w-full md:w-1/3 text-xs form-control mb-2">
        <button
          class="btn btn-sm btn-accent rounded-full"
          @click.prevent="addEntry"
        >
          <span class="fa fa-plus mr-1"></span> Add entry
        </button>
      </div> -->

    <!-- <div v-if="travelData.length" class="form-control mb-2">
        <span class="text-sm mb-2">Your entries</span>
        <div class="w-full flex flex-wrap gap-2">
          <div
            v-for="(entry, i) in travelData"
            :key="i"
            class="
              px-5
              py-2
              text-2xs
              bg-gray-200
              text-gray-600 text-sm
              rounded-lg
              md:w-1/4
              w-1/2
              min-w-sm
              relative
            "
          >
            <button
              class="
                px-1
                py-0.5
                rounded-md
                bg-red-600
                text-white
                absolute
                -top-2
                -right-2
              "
              @click.prevent="removeEntry(i)"
            >
              <span class="fa fa-minus mr-1"></span>
            </button>

            <h1>
              total:
              {{
                +entry.kilometerage +
                +entry.busKilometerage +
                +entry.trainKilometerage
              }}
              Km
              <br />
              <span>{{ new Date().toDateString() }}</span>
            </h1>
          </div>
        </div>
      </div>


      <div
        class="
          flex
          justify-between
          md:justify-start
          items-center
          gap-5
          border-t
          pt-5
        "
      >
        <button
          id="submit"
          class="btn btn-sm"
          type="submit"
          @click.prevent="submitTransportationData"
        >
          Submit
        </button>
        <button class="btn btn-sm" @click.prevent="$emit('sectionSubmit')">
          Skip section
        </button>
      </div>
    </form> -->
    <!-- <div
      class="w-full flex flex-wrap justify-center items-center mt-4 font-bold"
    >
      <div class="stat w-1/2 mb-2 rounded-2xl">
        <div class="stat-title">Total Emissions</div>
        <div class="stat-value text-lg">42 KgCO2</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      marks: {
        0: 'Low Distance',
        1000: 'Average Distance',
        2000: 'High Distamce',
      },
      mobileMarks: {
        0: 'Low',
        1000: 'Average',
        2000: 'High',
      },
      min: 0,
      max: 2000,
      transportSection: 'personal',
      personalSection: 'diesel',
      landSection: 'localBus',
      avationSection: 'sailingBoat',
      travelData: [],
      travelDataEntry: {
        diesel: 0,
        petrol: 0,
        electric: 0,
        hybrid: 0,
        localBus: 0,
        averageBus: 0,
        londonBus: 0,
        coach: 0,
        nationalTrain: 0,
        lightTrain: 0,
        londonUnderground: 0,
        internationalTrain: 0,
        sailingBoat: 0,
        largeMotorBoat: 0,
        domesticFlight: 0,
        shortFlight: 0,
        longFlight: 0,
        internationalFlight: 0,
        // carSize: null,
        // fuelType: null,
        // kilometerage: 0,
        // busType: null,
        // busKilometerage: 0,
        // trainType: null,
        // trainKilometerage: 0,
        factors: {
          diesel: 0.16,
          petrol: 0.18,
          electric: 0.01,
          hybrid: 0.02,
          localBus: 0.11848,
          averageBus: 0.10231,
          londonBus: 0.07808,
          coach: 0.0275,
          nationalTrain: 0.0079,
          lightTrain: 0.00489,
          londonUnderground: 0.0043,
          internationalTrain: 0.00083,
          sailingBoat: 5.8,
          largeMotorBoat: 588.2,
          domesticFlight: 0.02691,
          shortFlight: 0.01681,
          longFlight: 0.02114,
          internationalFlight: 0.02011,
        },
        finalEmissions: {
          // car: 0,
          // bus: 0,
          // train: 0,
          // total: 0,
          diesel: 0,
          petrol: 0,
          electric: 0,
          hybrid: 0,
          localBus: 0,
          averageBus: 0,
          londonBus: 0,
          coach: 0,
          nationalTrain: 0,
          lightTrain: 0,
          londonUnderground: 0,
          internationalTrain: 0,
          sailingBoat: 0,
          largeMotorBoat: 0,
          domesticFlight: 0,
          shortFlight: 0,
          longFlight: 0,
          internationalFlight: 0,
          total: 0,
        },
      },
    }
  },

  created() {
    if (this.$store.state.measure.transportationData) {
      // console.log(this.$store.state.measure.transportationData)
      this.travelData = [...this.$store.state.measure.transportationData]
    }
  },

  methods: {
    // addEntry() {

    // },

    removeEntry(i) {
      this.travelData.splice(i, 1)
    },

    clearTravelDataEntry() {
      this.travelDataEntry = {
        diesel: 0,
        petrol: 0,
        electric: 0,
        hybrid: 0,
        localBus: 0,
        averageBus: 0,
        londonBus: 0,
        coach: 0,
        nationalTrain: 0,
        lightTrain: 0,
        londonUnderground: 0,
        internationalTrain: 0,
        sailingBoat: 0,
        largeMotorBoat: 0,
        domesticFlight: 0,
        shortFlight: 0,
        longFlight: 0,
        internationalFlight: 0,
        factors: {
          diesel: 0.16,
          petrol: 0.18,
          electric: 0.01,
          hybrid: 0.02,
          localBus: 0.11848,
          averageBus: 0.10231,
          londonBus: 0.07808,
          coach: 0.0275,
          nationalTrain: 0.0079,
          lightTrain: 0.00489,
          londonUnderground: 0.0043,
          internationalTrain: 0.00083,
          sailingBoat: 5.8,
          largeMotorBoat: 588.2,
          domesticFlight: 0.02691,
          shortFlight: 0.01681,
          longFlight: 0.02114,
          internationalFlight: 0.02011,
        },
        finalEmissions: {
          diesel: 0,
          petrol: 0,
          electric: 0,
          hybrid: 0,
          localBus: 0,
          averageBus: 0,
          londonBus: 0,
          coach: 0,
          nationalTrain: 0,
          lightTrain: 0,
          londonUnderground: 0,
          internationalTrain: 0,
          sailingBoat: 0,
          largeMotorBoat: 0,
          domesticFlight: 0,
          shortFlight: 0,
          longFlight: 0,
          internationalFlight: 0,
          total: 0,
        },
      }
    },

    submitTransportationData() {
      this.travelData.push(this.travelDataEntry)
      this.clearTravelDataEntry()
      this.$store.dispatch('measure/setTransportationData', this.travelData)
      // console.log('submitted')
      this.$emit('sectionSubmit')
    },
    personalInputChange(e) {
      this.travelDataEntry[this.personalSection] = parseInt(e.target.value)
    },
    personalValue(val) {
      this.travelDataEntry[this.personalSection] = parseInt(val)
    },
    landInputChange(e) {
      this.travelDataEntry[this.landSection] = parseInt(e.target.value)
    },
    landValue(val) {
      this.travelDataEntry[this.landSection] = parseInt(val)
    },
    aviationInputChange(e) {
      this.travelDataEntry[this.avationSection] = parseInt(e.target.value)
    },
    aviationValue(val) {
      this.travelDataEntry[this.avationSection] = parseInt(val)
    },
  },
})
</script>

<style scoped></style>
