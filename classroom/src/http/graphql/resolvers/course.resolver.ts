import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CoursesService } from 'src/services/courses.service';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';
import { CreateCourseInput } from '../inputs/create-course';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.listAllCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentsService.getStudentByAuthUserId(user.sub);

    if (!student) throw new Error('Student not found');

    const enrollment = await this.enrollmentsService.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id,
    });

    if (!enrollment) throw new UnauthorizedException();

    return this.coursesService.getCourseById(id);
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Course)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.createCourse(data);
  }
}
